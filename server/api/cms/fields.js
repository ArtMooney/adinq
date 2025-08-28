import { checkLogin } from "~~/server/utils/check-login.js";
import { listFields } from "~~/server/db/baserow/list-fields.js";

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

  if (parseInt(body?.table_id) === config.baserowCmsUsersId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Table ID is not allowed",
    });
  }

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or password",
    });
  }

  return await listFields(config.baserowToken, body.table_id);
});
