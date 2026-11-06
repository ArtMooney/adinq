import { defineEventHandler } from "h3";
import { clearLegacyAdminCookie } from "../utils/admin-session.js";

export default defineEventHandler((event) => {
  clearLegacyAdminCookie(event);
});
