import { requireAdminSession } from "~~/server/utils/admin-session.js";
import { cmsTables } from "~~/server/db/cmsConfig.ts";
import { useDrizzle } from "~~/server/db/client.ts";
import * as schema from "~~/server/db/schema.ts";

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

  const itemsWithoutId = items.map(({ id, ...rest }) => rest);
  const chunkSize = 5;
  const chunks = [];

  for (let i = 0; i < itemsWithoutId.length; i += chunkSize) {
    chunks.push(itemsWithoutId.slice(i, i + chunkSize));
  }

  try {
    for (const chunk of chunks) {
      await db.insert(schema[tableName]).values(chunk);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to insert items:", error);
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to insert items",
    });
  }
});
