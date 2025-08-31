import { checkLogin } from "~~/server/utils/check-login.js";
import { listRows } from "~~/server/db/baserow/list-rows.js";
import { updateRow } from "~~/server/db/baserow/update-row.js";
import { generateUserId } from "~~/server/utils/generate-user-id.js";
import { sendEmail } from "~~/server/utils/mailgun/send-email.js";
import { messageEmailReset } from "~~/server/content/message-email-reset.js";

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

  if (!body?.email || !body?.pageuri) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or pageuri",
    });
  }

  const users = await listRows(config.baserowToken, config.baserowCmsUsersId);
  const user = users.results.find((user) => user.email === body.email);

  if (!user) {
    return "ok"; // User not found, return same as if ok is a security measure
  }

  user["reset-id"] = generateUserId(users);
  const saveUser = await updateRow(
    config.baserowToken,
    config.baserowCmsUsersId,
    user.id,
    user,
  );

  if (saveUser.error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error saving user",
    });
  }

  const sendToEmail = await sendEmail(
    config.emailFrom,
    body.email,
    "Change password for your account on Simple CMS",
    await messageEmailReset(body.pageuri, user["reset-id"]),
    config.mailgunApiKey,
  );

  return "ok";
});
