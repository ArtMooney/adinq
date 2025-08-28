import { checkLogin } from "~~/server/utils/check-login.js";
import { listTables } from "~~/server/db/baserow/list-tables.js";
import { listRows } from "~~/server/db/baserow/list-rows.js";
import { updateRow } from "~~/server/db/baserow/update-row.js";
import { sendEmail } from "~~/server/utils/mailgun/send-email.js";
import { messageNewPassword } from "~~/server/content/message-new-password.js";

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

  if (!body.password || !body.validation) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing password or validation",
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

  const user = await listRows(
    config.baserowToken,
    usersId,
    null,
    null,
    body.validation,
  );

  if (!user || user.results.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Error validating account",
    });
  }

  user.results[0].password = body.password;
  user.results[0]["reset-id"] = "";
  const savePassword = await updateRow(
    config.baserowToken,
    usersId,
    user.results[0].id,
    user.results[0],
  );

  if (savePassword.error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error saving password",
    });
  }

  const sendToEmail = await sendEmail(
    config.emailFrom,
    savePassword.email,
    "Your password to log into Simple CMS was changed",
    await messageNewPassword(),
    config.mailgunApiKey,
  );

  return "ok";
});
