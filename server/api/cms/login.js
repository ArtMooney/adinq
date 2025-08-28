import { checkLogin } from "~~/server/utils/check-login.js";
import { listTables } from "~~/server/db/baserow/list-tables.js";
import { listRows } from "~~/server/db/baserow/list-rows.js";

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

  const usersId = schema.find((table) => table.name === "CMS users")?.id;

  if (!usersId) {
    throw createError({
      statusCode: 500,
      statusMessage: "CMS users table not found",
    });
  }

  const user = await listRows(config.baserowToken, usersId, body.email);

  if (user.results.length === 0 || user.results[0].password !== body.password) {
    throw createError({
      statusCode: 401,
      statusMessage: "Error logging in",
    });
  }

  return {
    success: true,
    data: {
      message: "Logged in successfully",
    },
  };
});
