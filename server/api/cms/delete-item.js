import { checkLogin } from "~~/server/utils/check-login.js";
import { deleteRow } from "~~/server/db/baserow/delete-row.js";

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

  return await deleteRow(config.baserowToken, body.table_id, body.row_id);
});
