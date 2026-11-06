import { defineEventHandler } from "h3";
import {
  deleteAdminSession,
  requireAdminPost,
} from "../../utils/admin-session.js";

export default defineEventHandler(async (event) => {
  requireAdminPost(event);
  await deleteAdminSession(event);
  return { success: true };
});
