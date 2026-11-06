import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { after, before, test } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://admin.example.test";
const email = "admin@example.test";
const password = "test-only-admin-password";
const cookieName = "adinq_admin_session";
const publicAuthorization = `Basic ${Buffer.from("test-public-user:test-public-password").toString("base64")}`;
const protectedRoutes = [
  "tables",
  "fields",
  "rows",
  "add-item",
  "add-items",
  "save-item",
  "save-sort-order",
  "delete-item",
  "delete-items",
];

let server;
let passwordHash;
let migrations;
let buildDirectory;

before(async () => {
  buildDirectory = await mkdtemp(path.join(tmpdir(), "adinq-admin-tests-"));
  const entry = [
    'export { createApp, defineEventHandler, toWebHandler } from "h3";',
    `export { hashPassword } from ${JSON.stringify(path.join(root, "server/routes/cms/utils/password.js"))};`,
    `export { createAdminSession } from ${JSON.stringify(path.join(root, "server/utils/admin-session.js"))};`,
    `export { default as legacyCookieMiddleware } from ${JSON.stringify(path.join(root, "server/middleware/legacy-admin-cookie.js"))};`,
    `export { mailCalls } from ${JSON.stringify(path.join(root, "server/utils/mailgun/send-email.js"))};`,
    ...[
      ["login", "login.post.js"],
      ["session", "session.get.js"],
      ["logout", "logout.post.js"],
      ["reset", "reset.js"],
      ["new_password", "new-password.js"],
      ...protectedRoutes.map((route) => [
        route.replaceAll("-", "_"),
        `${route}.js`,
      ]),
    ].map(
      ([name, file]) =>
        `export { default as ${name} } from ${JSON.stringify(path.join(root, "server/routes/cms", file))};`,
    ),
  ].join("\n");
  const outfile = path.join(buildDirectory, "server.mjs");
  await build({
    stdin: { contents: entry, resolveDir: root, loader: "js" },
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    define: { "import.meta.dev": "false" },
    mainFields: ["module", "main"],
    banner: {
      js: 'import { createRequire } from "node:module"; const require = createRequire(import.meta.url);',
    },
    alias: { "~~": root },
    inject: [path.join(root, "tests/helpers/nuxt-auto-imports.js")],
    plugins: [
      {
        name: "local-mail-only",
        setup(builder) {
          builder.onResolve({ filter: /mailgun\/send-email\.js$/ }, () => ({
            path: "mailgun",
            namespace: "test-mail",
          }));
          builder.onLoad({ filter: /.*/, namespace: "test-mail" }, () => ({
            contents: `
              export const mailCalls = [];
              export async function sendEmail(from, to, subject, message) {
                mailCalls.push({ from, to, subject, message });
                return { id: "local-test-mail" };
              }
            `,
          }));
        },
      },
    ],
    logLevel: "silent",
  });
  server = await import(pathToFileURL(outfile));
  passwordHash = await server.hashPassword(password);
  migrations = await Promise.all(
    (await readdir(path.join(root, "migrations")))
      .filter((name) => name.endsWith(".sql"))
      .sort()
      .map((name) => readFile(path.join(root, "migrations", name), "utf8")),
  );
});

after(async () => {
  if (buildDirectory)
    await rm(buildDirectory, { recursive: true, force: true });
});

// Run the real Drizzle D1 driver against an isolated SQLite database. Only the
// small Cloudflare prepared-statement interface is adapted; SQL is not mocked.
function d1Database(sqlite) {
  return {
    prepare(sql) {
      return {
        bind(...parameters) {
          const statement = sqlite.prepare(sql);
          return {
            async run() {
              const result = statement.run(...parameters);
              return { success: true, results: [], meta: result };
            },
            async all() {
              return { success: true, results: statement.all(...parameters) };
            },
            async raw() {
              statement.setReturnArrays(true);
              return statement.all(...parameters);
            },
          };
        },
      };
    },
    async batch(statements) {
      sqlite.exec("BEGIN");
      try {
        const results = await Promise.all(
          statements.map((statement) => statement.all()),
        );
        sqlite.exec("COMMIT");
        return results;
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }
    },
  };
}

function fixture(t, extraHandlers = {}) {
  server.mailCalls.length = 0;
  const sqlite = new DatabaseSync(":memory:");
  t.after(() => sqlite.close());
  sqlite.exec("PRAGMA foreign_keys = ON");
  for (const migration of migrations) sqlite.exec(migration);
  sqlite
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, passwordHash);

  const app = server.createApp();
  app.use(
    server.defineEventHandler((event) => {
      event.context.cloudflare = {
        ...event.context.cloudflare,
        env: {
          DB: d1Database(sqlite),
          FILES: {
            async put() {
              assert.fail("This test must not upload files");
            },
            async head() {
              assert.fail("This test must not inspect remote files");
            },
            async delete() {
              assert.fail("This test must not delete remote files");
            },
          },
        },
      };
    }),
  );
  app.use(server.legacyCookieMiddleware);
  for (const route of [
    "login",
    "session",
    "logout",
    "reset",
    "new-password",
    ...protectedRoutes,
  ]) {
    app.use(`/cms/${route}`, server[route.replaceAll("-", "_")], {
      match: (remainingPath) => remainingPath === "/",
    });
  }
  for (const [route, handler] of Object.entries(extraHandlers)) {
    app.use(
      route.startsWith("/") ? route : `/cms/${route}`,
      server.defineEventHandler(handler),
      {
        match: (remainingPath) => remainingPath === "/",
      },
    );
  }
  const handle = server.toWebHandler(app);

  async function request(route, options = {}) {
    const {
      method = "POST",
      body,
      cookie,
      requestOrigin = origin,
      baseUrl = origin,
      cloudflareBaseUrl,
      authorization,
    } = options;
    const url = new URL(
      route.startsWith("/") ? route : `/cms/${route}`,
      baseUrl,
    );
    const headers = new Headers({
      host: url.host,
      "x-forwarded-proto": url.protocol.slice(0, -1),
    });
    if (requestOrigin !== null) headers.set("origin", requestOrigin);
    if (cookie) headers.set("cookie", cookie);
    if (authorization) headers.set("authorization", authorization);
    if (body !== undefined) headers.set("content-type", "application/json");
    const response = await handle(
      new Request(url, {
        method,
        headers,
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      }),
      cloudflareBaseUrl
        ? {
            cloudflare: {
              request: new Request(new URL(url.pathname, cloudflareBaseUrl)),
            },
          }
        : undefined,
    );
    const content = await response.text();
    return {
      response,
      data: response.headers.get("content-type")?.includes("application/json")
        ? JSON.parse(content)
        : content,
      cookies: response.headers.getSetCookie(),
    };
  }

  async function login(options = {}) {
    const result = await request("login", {
      body: { email, password },
      ...options,
    });
    assert.equal(result.response.status, 200);
    const cookie = result.cookies.find((value) =>
      value.startsWith(`${cookieName}=`),
    );
    assert.ok(cookie);
    return { ...result, cookie: cookie.split(";")[0] };
  }

  return { sqlite, request, login };
}

test("login sets a protected session cookie and stores only its hash", async (t) => {
  const { sqlite, login } = fixture(t);
  const { response, data, cookies, cookie } = await login({
    cookie: "loginStore=legacy-secret",
  });
  const sessionCookie = cookies.find((value) =>
    value.startsWith(`${cookieName}=`),
  );
  assert.match(sessionCookie, /; HttpOnly/i);
  assert.match(sessionCookie, /; Secure/i);
  assert.match(sessionCookie, /; SameSite=Strict/i);
  assert.match(sessionCookie, /; Path=\/(;|$)/i);
  assert.doesNotMatch(sessionCookie, /Max-Age|Expires=/i);
  assert.ok(
    cookies.some((value) => /^loginStore=;.*Max-Age=0/i.test(value)),
    "The old cookie containing credentials must be removed",
  );
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(data.user, { email });
  assert.ok(Math.abs(data.expiresAt - Date.now() - 8 * 60 * 60 * 1000) < 5000);
  assert.doesNotMatch(JSON.stringify(data), /password|tokenHash|legacy-secret/);
  assert.ok(!cookie.includes(password));
  const token = cookie.slice(cookie.indexOf("=") + 1);
  assert.match(token, /^[a-f0-9]{64}$/);
  const stored = sqlite.prepare("SELECT * FROM admin_sessions").get();
  assert.equal(
    stored.token_hash,
    createHash("sha256").update(token).digest("hex"),
  );
  assert.notEqual(stored.token_hash, token);
  assert.deepEqual(Object.keys(stored).sort(), [
    "expires_at",
    "token_hash",
    "user_id",
  ]);
});

test("login rejects incorrect credentials and email LIKE wildcards", async (t) => {
  const { sqlite, request } = fixture(t);
  for (const credentials of [
    { email, password: "incorrect" },
    { email: "missing@example.test", password },
    { email: "%", password },
    { email: "admin@%.test", password },
    { email: "admin@ex_mple.test", password },
  ]) {
    const result = await request("login", { body: credentials });
    assert.equal(
      result.response.status,
      401,
      JSON.stringify(credentials.email),
    );
    assert.ok(
      !result.cookies.some((value) => value.startsWith(`${cookieName}=`)),
    );
  }
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    0,
  );
});

test("login and reset accept mixed-case email without changing the stored address", async (t) => {
  const { sqlite, request } = fixture(t);
  const mixedCase = "  AdMiN@ExAmPlE.TeSt  ";
  const loggedIn = await request("login", {
    body: { email: mixedCase, password },
  });
  assert.equal(loggedIn.response.status, 200);
  assert.deepEqual(loggedIn.data.user, { email });
  const reset = await request("reset", {
    authorization: publicAuthorization,
    body: { email: mixedCase },
  });
  assert.equal(reset.response.status, 200);
  assert.ok(
    sqlite.prepare("SELECT reset_id FROM users WHERE id = 1").get().reset_id,
  );
  assert.equal(server.mailCalls.length, 1);
  assert.equal(server.mailCalls[0].to, email);
});

test("production cookies remain Secure even if the internal request uses HTTP", async (t) => {
  const { login } = fixture(t);
  const { cookies } = await login({
    baseUrl: "http://admin.example.test",
    requestOrigin: "http://admin.example.test",
  });
  assert.match(
    cookies.find((value) => value.startsWith(`${cookieName}=`)),
    /; Secure/i,
  );
});

test("Cloudflare's original HTTPS URL and port govern Origin checks and reset links", async (t) => {
  const { request, login } = fixture(t);
  const publicOrigin = "https://admin.example.test:8443";
  const forwarded = {
    baseUrl: "http://admin.example.test",
    cloudflareBaseUrl: publicOrigin,
    requestOrigin: publicOrigin,
  };
  const { cookie } = await login(forwarded);
  assert.equal(
    (await request("tables", { ...forwarded, cookie, body: {} })).response
      .status,
    200,
  );
  for (const requestOrigin of [
    "https://attacker.example.test:8443",
    "https://admin.example.test",
    "http://admin.example.test:8443",
  ]) {
    const result = await request("tables", {
      ...forwarded,
      cookie,
      body: {},
      requestOrigin,
    });
    assert.equal(result.response.status, 403, requestOrigin);
  }
  const reset = await request("reset", {
    ...forwarded,
    authorization: publicAuthorization,
    body: { email },
  });
  assert.equal(reset.response.status, 200);
  assert.equal(server.mailCalls.length, 1);
  assert.match(
    server.mailCalls[0].message,
    /https:\/\/admin\.example\.test:8443\/admin\?validation=/,
  );
  assert.ok(!server.mailCalls[0].message.includes("http://admin.example.test"));
});

test("a password reset prevents a stale verified login from creating a session", async (t) => {
  const { sqlite, request } = fixture(t, {
    "stale-login": (event) =>
      server.createAdminSession(event, {
        id: 1,
        email,
        password: passwordHash,
      }),
  });
  const newHash = await server.hashPassword("replacement-password");
  sqlite.prepare("UPDATE users SET password = ? WHERE id = 1").run(newHash);
  const result = await request("stale-login");
  assert.equal(result.response.status, 401);
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    0,
  );
  assert.ok(
    !result.cookies.some(
      (value) =>
        value.startsWith(`${cookieName}=`) &&
        !value.startsWith(`${cookieName}=;`),
    ),
  );
  assert.equal(
    (
      await request("login", {
        body: { email, password: "replacement-password" },
      })
    ).response.status,
    200,
  );
});

test("login validates types and credential lengths", async (t) => {
  const { request } = fixture(t);
  for (const body of [
    {},
    { email, password: 123 },
    { email: [email], password },
    { email: "a".repeat(255), password },
    { email, password: "a".repeat(1025) },
  ]) {
    assert.equal((await request("login", { body })).response.status, 400);
  }
});

test("state-changing routes reject missing/cross-site Origin and GET", async (t) => {
  const { request, login } = fixture(t);
  const { cookie } = await login();
  for (const route of [
    "login",
    "logout",
    "reset",
    "new-password",
    ...protectedRoutes,
  ]) {
    for (const requestOrigin of [
      null,
      "https://attacker.example.test",
      "null",
    ]) {
      const result = await request(route, {
        cookie,
        requestOrigin,
        body: { email, password },
      });
      assert.equal(result.response.status, 403, `${route}: ${requestOrigin}`);
    }
    const result = await request(route, { method: "GET", cookie });
    assert.equal(result.response.status, 405, route);
  }
  assert.equal(
    (await request("session", { method: "GET", cookie })).response.status,
    200,
  );
});

test("session lookup rejects missing, malformed and forged tokens", async (t) => {
  const { request } = fixture(t);
  for (const cookie of [
    undefined,
    `${cookieName}=bad-token`,
    `${cookieName}=${"a".repeat(64)}`,
  ]) {
    const result = await request("session", { method: "GET", cookie });
    assert.equal(result.response.status, 401);
    assert.equal(result.response.headers.get("cache-control"), "no-store");
    if (cookie) {
      assert.ok(
        result.cookies.some((value) => value.startsWith(`${cookieName}=;`)),
      );
    }
  }
});

test("valid session survives a new request without resending a password", async (t) => {
  const { request, login } = fixture(t);
  const { cookie, data } = await login();
  const result = await request("session", { method: "GET", cookie });
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.data, { user: { email }, expiresAt: data.expiresAt });
  assert.doesNotMatch(JSON.stringify(result.data), /password|token/);
});

test("expired sessions are rejected and deleted", async (t) => {
  const { sqlite, request, login } = fixture(t);
  const { cookie } = await login();
  sqlite
    .prepare("UPDATE admin_sessions SET expires_at = ?")
    .run(Date.now() - 1);
  assert.equal(
    (await request("session", { method: "GET", cookie })).response.status,
    401,
  );
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    0,
  );
});

test("logout revokes the token so replaying the old cookie fails", async (t) => {
  const { sqlite, request, login } = fixture(t);
  const { cookie } = await login();
  const result = await request("logout", { cookie });
  assert.equal(result.response.status, 200);
  assert.ok(
    result.cookies.some((value) => value.startsWith(`${cookieName}=;`)),
  );
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    0,
  );
  assert.equal(
    (await request("session", { method: "GET", cookie })).response.status,
    401,
  );
  assert.equal(
    (await request("tables", { cookie, body: {} })).response.status,
    401,
  );
});

test("logging in again rotates the existing session token", async (t) => {
  const { sqlite, request, login } = fixture(t);
  const first = await login();
  const second = await login({ cookie: first.cookie });
  assert.notEqual(first.cookie, second.cookie);
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    1,
  );
  assert.equal(
    (await request("session", { method: "GET", cookie: first.cookie })).response
      .status,
    401,
  );
  assert.equal(
    (await request("session", { method: "GET", cookie: second.cookie }))
      .response.status,
    200,
  );
});

test("legacy cookie is cleared even when there is no new session", async (t) => {
  const { request } = fixture(t);
  const result = await request("session", {
    method: "GET",
    cookie: "loginStore=legacy-secret",
  });
  assert.equal(result.response.status, 401);
  assert.ok(
    result.cookies.some((value) => /^loginStore=;.*Max-Age=0/i.test(value)),
  );
});

test("legacy cookie is also cleared on a public page without starting a session", async (t) => {
  const { request } = fixture(t, { "/": () => ({ public: true }) });
  const result = await request("/", {
    method: "GET",
    cookie: "loginStore=legacy-secret",
    requestOrigin: null,
  });
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.data, { public: true });
  assert.ok(
    result.cookies.some((value) => /^loginStore=;.*Max-Age=0/i.test(value)),
  );
  assert.ok(
    !result.cookies.some((value) => value.startsWith(`${cookieName}=`)),
  );
});

test("old credentials in a request body cannot bypass any CMS guard", async (t) => {
  const { request } = fixture(t);
  for (const route of protectedRoutes) {
    const result = await request(route, {
      body: {
        email,
        password,
        table_id: "static_content",
        item: {},
        schema: [],
        items: [],
      },
      cookie: "loginStore=legacy-secret",
    });
    assert.equal(result.response.status, 401, route);
  }
});

test("authenticated CMS reads and writes work with only the session cookie", async (t) => {
  const { request, login } = fixture(t);
  const { cookie } = await login();
  const call = (route, body = {}) => request(route, { cookie, body });
  assert.equal((await call("tables")).response.status, 200);
  assert.equal(
    (await call("fields", { table_id: "static_content" })).response.status,
    200,
  );
  const first = await call("add-item", {
    table_id: "static_content",
    schema: [],
    item: { title: "Session test", content: { text: "Before" }, sortOrder: 1 },
  });
  assert.equal(first.response.status, 200);
  const saved = await call("save-item", {
    table_id: "static_content",
    schema: [],
    item: { ...first.data, content: { text: "After" } },
  });
  assert.equal(saved.response.status, 200);
  assert.equal(saved.data.content.text, "After");
  assert.equal(
    (
      await call("add-items", {
        table_id: "static_content",
        items: [{ title: "Second", sortOrder: 2 }],
      })
    ).response.status,
    200,
  );
  const rows = await call("rows", { table_id: "static_content" });
  assert.equal(rows.response.status, 200);
  assert.equal(rows.data.length, 2);
  assert.equal(
    (
      await call("save-sort-order", {
        table_id: "static_content",
        items: rows.data.map((item, index) => ({
          id: item.id,
          sortOrder: 2 - index,
        })),
      })
    ).response.status,
    200,
  );
  assert.equal(
    (
      await call("delete-item", {
        table_id: "static_content",
        item: first.data,
        schema: [],
      })
    ).response.status,
    200,
  );
  assert.equal(
    (
      await call("delete-items", {
        table_id: "static_content",
        items: rows.data.slice(1),
      })
    ).response.status,
    200,
  );
  assert.deepEqual(
    (await call("rows", { table_id: "static_content" })).data,
    [],
  );
});

test("password reset consumes its token and revokes every existing session", async (t) => {
  const { sqlite, request, login } = fixture(t);
  const first = await login();
  const second = await login();
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    2,
  );

  const reset = await request("reset", {
    authorization: publicAuthorization,
    body: { email },
  });
  assert.equal(reset.response.status, 200);
  const validation = sqlite
    .prepare("SELECT reset_id FROM users WHERE id = 1")
    .get().reset_id;
  assert.ok(validation);
  assert.equal(server.mailCalls.length, 1);
  assert.equal(server.mailCalls[0].to, email);

  const replacement = "changed-password-for-reset-test";
  const changed = await request("new-password", {
    authorization: publicAuthorization,
    body: { validation, password: replacement },
  });
  assert.equal(changed.response.status, 200);
  assert.equal(
    sqlite.prepare("SELECT reset_id FROM users WHERE id = 1").get().reset_id,
    "",
  );
  assert.equal(
    sqlite.prepare("SELECT COUNT(*) AS count FROM admin_sessions").get().count,
    0,
  );
  assert.equal(server.mailCalls.length, 2);
  for (const { cookie } of [first, second]) {
    assert.equal(
      (await request("session", { method: "GET", cookie })).response.status,
      401,
    );
  }
  assert.equal(
    (await request("login", { body: { email, password } })).response.status,
    401,
  );
  assert.equal(
    (await request("login", { body: { email, password: replacement } }))
      .response.status,
    200,
  );
  const replay = await request("new-password", {
    authorization: publicAuthorization,
    body: { validation, password: "attacker-replay" },
  });
  assert.equal(replay.response.status, 404);
  assert.equal(server.mailCalls.length, 2);
});
