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

  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or password",
    });
  }

  const user = await listRows(
    config.baserowToken,
    config.baserowCmsUsersId,
    body.email,
  );

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
