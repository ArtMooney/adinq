import { createError, defineEventHandler } from "h3";
import { getAdminSession } from "../../utils/admin-session.js";

export default defineEventHandler(async (event) => {
  const session = await getAdminSession(event);
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  return session;
});
