import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  resetId: text("reset_id"),
});

export const mediaproduktioner = sqliteTable("mediaproduktioner", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  qCardLink: text("q-card-link"),
  screenshot: text("screenshot"),
  filmtyp: text("filmtyp"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const medarbetare = sqliteTable("medarbetare", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title"),
  phone: text("phone"),
  email: text("email"),
  photo: text("photo"),
  department: text("department"),
  sortOrder: integer("sort_order"),
  adjustx: real("adjustx"),
  adjusty: real("adjusty"),
  zoom: real("zoom"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
