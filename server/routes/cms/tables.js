import { requireAdminSession } from "~~/server/utils/admin-session.js";
import { cmsTables } from "~~/server/db/cmsConfig.ts";

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const body = await readBody(event);

  if (cmsTables.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "No tables found",
    });
  }

  return cmsTables;
});
