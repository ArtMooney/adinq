import { requireAdminSession } from "~~/server/utils/admin-session.js";
import { cmsTables } from "~~/server/db/cmsConfig.ts";
import { useDrizzle } from "~~/server/db/client.ts";
import * as schema from "~~/server/db/schema.ts";
import { inArray } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);
  const body = await readBody(event);

  const db = useDrizzle(event.context.cloudflare.env.DB);
  const tableName = body.table_id;
  const items = body.items;

  if (!cmsTables.some((table) => table.id === tableName)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid table",
    });
  }

  if (items.length === 0) return { success: true };

  const ids = items.map((item) => item.id).filter((id) => id !== undefined);

  if (ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No valid IDs provided",
    });
  }

  const chunkSize = 100;
  const chunks = [];

  for (let i = 0; i < ids.length; i += chunkSize) {
    chunks.push(ids.slice(i, i + chunkSize));
  }

  try {
    for (const chunk of chunks) {
      await db
        .delete(schema[tableName])
        .where(inArray(schema[tableName].id, chunk));
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete items:", error);
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to delete items",
    });
  }
});
