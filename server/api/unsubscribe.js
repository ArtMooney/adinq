import { sendEmail } from "../utils/mailgun/send-email.js";
import { checkLogin } from "../utils/check-login.js";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);

  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({
      statusCode: 401,
      statusMessage: "Login failed",
    });
  }

  const formData = await readFormData(event);
  const formDataJson = Object.fromEntries(formData);

  if (Object.keys(formDataJson).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No form data provided",
    });
  }

  const toOwner = await sendEmail(
    config.emailFrom,
    config.unsubscribeTo,
    "Kan ni vara snälla och avregistrera mig från maillistan?",
    JSON.stringify(formDataJson, null, 2),
    config.mailgunApiKey,
  );

  if (!toOwner.id) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email to owner",
    });
  }

  return {
    success: true,
    data: {
      message: "Email sent successfully",
    },
  };
});
