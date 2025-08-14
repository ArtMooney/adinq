import { checkLogin } from "../utils/check-login.js";
import { listTables } from "../db/baserow/list-tables.js";
import { listRows } from "../db/baserow/list-rows.js";
import { updateRow } from "../db/baserow/update-row.js";
import { generateUserId } from "../utils/generate-user-id.js";
import { sendEmail } from "~/server/utils/mailgun/send-email.js";
import { messageEmailReset } from "../content/message-email-reset.js";

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

  if (!body?.email || !body?.pageuri) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email or pageuri",
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

  const users = await listRows(config.baserowToken, usersId);
  const user = users.results.find((user) => user.email === body.email);

  if (!user) {
    return "ok"; // User not found, return same as if ok is a security measure
  }

  user["reset-id"] = generateUserId(users);
  const saveUser = await updateRow(config.baserowToken, usersId, user.id, user);

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
