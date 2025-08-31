import { checkLogin } from "~~/server/utils/check-login.js";
import { listRows } from "~~/server/db/baserow/list-rows.js";

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

  if (!body?.validation) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing a validation code",
    });
  }

  const user = await listRows(
    config.baserowToken,
    config.baserowCmsUsersId,
    body.validation,
  );

  if (!user || user.results.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid validation code",
    });
  }

  return "ok";
});
