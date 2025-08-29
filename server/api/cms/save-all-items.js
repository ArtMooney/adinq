import { checkLogin } from "~~/server/utils/check-login.js";
import { updateRows } from "~~/server/db/baserow/update-rows.js";

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

  return await updateRows(
    config.baserowToken,
    body.schema.find((item) => item.table_id)?.table_id,
    body.items,
  );
});
