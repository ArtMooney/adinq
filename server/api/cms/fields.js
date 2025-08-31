import { checkLogin } from "~~/server/utils/check-login.js";
import { checkAuthentication } from "~~/server/utils/check-authentication.js";
import { listFields } from "~~/server/db/baserow/list-fields.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  const body = await readBody(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!(await checkAuthentication(config, body?.email, body?.password))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Failed to login",
    });
  }

  if (parseInt(body?.table_id) === parseInt(config.baserowCmsUsersId)) {
    throw createError({
      statusCode: 500,
      statusMessage: "Table ID is not allowed",
    });
  }

  return await listFields(config.baserowToken, body.table_id);
});
