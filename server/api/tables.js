import { checkLogin } from "../utils/check-login.js";
import { listTables } from "~/server/db/baserow/list-tables.js";
import { listRows } from "~/server/db/baserow/list-rows.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or password",
    });
  }

  const schema = await listTables(
    config.baserowUsername,
    config.baserowPassword,
    config.baserowDbId,
  );

  const users = schema.find((table) => table.name === "CMS users")?.id;

  if (!users) {
    throw createError({
      statusCode: 500,
      statusMessage: "No users id found",
    });
  }

  const tables = schema.filter((table) => table.name !== "CMS users");

  if (tables.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "No tables found",
    });
  }

  const user = await listRows(
    config.baserowToken,
    users,
    null,
    null,
    body.email,
  );

  if (user.results.length === 0 || user.results[0].password !== body.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login credentials are incorrect",
    });
  }

  return tables;
});
