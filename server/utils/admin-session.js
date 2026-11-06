import {
  assertMethod,
  createError,
  deleteCookie,
  getCookie,
  getHeader,
  getRequestURL,
  setCookie,
  setHeader,
} from "h3";
import { and, eq, gt, lte, sql } from "drizzle-orm";
import { useDrizzle } from "../db/client.ts";
import { adminSessions, users } from "../db/schema.ts";

const COOKIE_NAME = "adinq_admin_session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

export function getAdminRequestURL(event) {
  // Cloudflare Pages forwards through Nitro's local HTTP adapter. Use the
  // original request to preserve its public HTTPS scheme and port.
  const request = event.context.cloudflare?.request;
  return request ? new URL(request.url) : getRequestURL(event);
}

function cookieOptions(event) {
  return {
    httpOnly: true,
    secure: !import.meta.dev || getAdminRequestURL(event).protocol === "https:",
    sameSite: "strict",
    path: "/",
  };
}

function clearCookies(event) {
  deleteCookie(event, COOKIE_NAME, cookieOptions(event));
  clearLegacyAdminCookie(event);
}

export function clearLegacyAdminCookie(event) {
  // Remove the previous client-readable cookie, which could contain a password.
  if (getCookie(event, "loginStore")) {
    deleteCookie(event, "loginStore", { path: "/" });
  }
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function tokenHash(token) {
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token),
  );
  return toHex(new Uint8Array(hash));
}

export function requireAdminPost(event) {
  assertMethod(event, "POST");
  setHeader(event, "Cache-Control", "no-store");

  const origin = getHeader(event, "origin");
  if (!origin || origin !== getAdminRequestURL(event).origin) {
    throw createError({ statusCode: 403, statusMessage: "Invalid origin" });
  }
}

export async function createAdminSession(event, user) {
  const db = useDrizzle(event.context.cloudflare.env.DB);
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)));
  const expiresAt = Date.now() + SESSION_DURATION;

  await deleteAdminSession(event);
  await db
    .delete(adminSessions)
    .where(lte(adminSessions.expiresAt, Date.now()));
  // A concurrent password reset must not allow a login verified with the old
  // password to create a new session after the reset revoked existing sessions.
  const inserted = await db
    .insert(adminSessions)
    .select(
      db
        .select({
          tokenHash: sql`${await tokenHash(token)}`.as("token_hash"),
          userId: users.id,
          expiresAt: sql`${expiresAt}`.as("expires_at"),
        })
        .from(users)
        .where(and(eq(users.id, user.id), eq(users.password, user.password))),
    )
    .returning({ tokenHash: adminSessions.tokenHash })
    .get();

  if (!inserted) {
    throw createError({
      statusCode: 401,
      statusMessage: "Please log in again",
    });
  }

  // No maxAge/expires: this is a browser-session cookie with an additional
  // absolute server-side expiry. Only the hash of the random token is stored.
  setCookie(event, COOKIE_NAME, token, cookieOptions(event));
  return { user: { email: user.email }, expiresAt };
}

export async function getAdminSession(event) {
  setHeader(event, "Cache-Control", "no-store");
  clearLegacyAdminCookie(event);

  const token = getCookie(event, COOKIE_NAME);
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    if (token) clearCookies(event);
    return null;
  }

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const hash = await tokenHash(token);
  const session = await db
    .select({
      userId: users.id,
      email: users.email,
      expiresAt: adminSessions.expiresAt,
    })
    .from(adminSessions)
    .innerJoin(users, eq(users.id, adminSessions.userId))
    .where(
      and(
        eq(adminSessions.tokenHash, hash),
        gt(adminSessions.expiresAt, Date.now()),
      ),
    )
    .get();

  if (!session) {
    await db.delete(adminSessions).where(eq(adminSessions.tokenHash, hash));
    clearCookies(event);
    return null;
  }

  return { user: { email: session.email }, expiresAt: session.expiresAt };
}

export async function requireAdminSession(event) {
  requireAdminPost(event);
  const session = await getAdminSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  return session;
}

export async function deleteAdminSession(event) {
  setHeader(event, "Cache-Control", "no-store");
  const token = getCookie(event, COOKIE_NAME);
  if (token && /^[a-f0-9]{64}$/.test(token)) {
    const db = useDrizzle(event.context.cloudflare.env.DB);
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.tokenHash, await tokenHash(token)));
  }
  clearCookies(event);
}
