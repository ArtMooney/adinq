import { sendEmail } from "../utils/mailgun/send-email.js";
import { messageContact } from "../content/message-contact.js";
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

  // const formData = await readFormData(event);
  // const formDataJson = Object.fromEntries(formData);
  //
  // if (Object.keys(formDataJson).length === 0) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: "No form data provided",
  //   });
  // }
  //
  // const toOwner = await sendEmail(
  //   config.emailFrom,
  //   config.emailTo,
  //   "Kontakt via hemsidan",
  //   JSON.stringify(formDataJson, null, 2),
  //   config.mailgunApiKey,
  // );
  //
  // if (!toOwner.id) {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: "Failed to send email to owner",
  //   });
  // }
  //
  // const toContact = await sendEmail(
  //   config.emailTo,
  //   formDataJson.email,
  //   "Tack för att ni kontaktat ADinQ!",
  //   await messageContact(),
  //   config.mailgunApiKey,
  // );
  //
  // if (!toContact.id) {
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: "Failed to send email to contact",
  //   });
  // }

  return {
    success: true,
    data: {
      message: "Email sent successfully",
    },
  };
});

// import { corsHeaders, handleCors } from "./middleware/cors.js";
// import { checkLogin } from "./middleware/check-login.js";
// import { listTables } from "./baserow/list-tables.js";
// import { listRows } from "./baserow/list-rows.js";
//
// export const onRequestPost = async ({ request, env, ctx }) => {
//   const corsResponse = await handleCors(request, env);
//   if (corsResponse) return corsResponse;
//
//   const url = new URL(request.url);
//
//   if (!(await checkLogin(request.headers, env.USERNAME, env.USERPASS)))
//     return new Response(JSON.stringify({ error: "Login failed" }), {
//       headers: corsHeaders,
//     });
//
//   const body = await request.json();
//
//   if (!body.email || !body.password) {
//     return new Response(JSON.stringify("error"), { headers: corsHeaders });
//   }
//
//   const schema = await listTables(
//     env.BASEROW_USERNAME,
//     env.BASEROW_PASSWORD,
//     env.BASEROW_DB_ID,
//   );
//
//   const usersId = schema.find((table) => table.name === "CMS users")?.id;
//
//   if (!usersId) {
//     return new Response(JSON.stringify("error"), { headers: corsHeaders });
//   }
//
//   const user = await listRows(env.BASEROW_BACKEND_TOKEN, usersId, body.email);
//
//   if (user.results.length === 0 || user.results[0].password !== body.password) {
//     return new Response(JSON.stringify("error"), { headers: corsHeaders });
//   }
//
//   return new Response(JSON.stringify("ok"), { headers: corsHeaders });
// };
