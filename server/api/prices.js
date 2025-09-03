import { checkLogin } from "../utils/check-login.js";
import { listRows } from "../db/baserow/list-rows.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  try {
    const data = await listRows(config.baserowToken, "598477", true, "index");

    return data.results;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Getting prices data failed",
    });
  }
});
