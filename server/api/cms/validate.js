import { checkLogin } from "~/server/utils/check-login.js";
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

  if (!body?.validation) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing a validation code",
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

  const user = await listRows(config.baserowToken, usersId, body.validation);

  if (!user || user.results.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid validation code",
    });
  }

  return "ok";
});
