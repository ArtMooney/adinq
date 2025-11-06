import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
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
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
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
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const kundutlatanden = sqliteTable("kundutlatanden", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  text: text("text"),
  att: text("att"),
  logo: text("logo"),
  link: text("link"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const prisexempel = sqliteTable("prisexempel", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  monthly: text("monthly"),
  total: text("total"),
  details: text("details"),
  sortOrder: integer("sort_order"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const cmsTables = [
  { id: "mediaproduktioner", name: "Mediaproduktioner" },
  { id: "medarbetare", name: "Medarbetare" },
  { id: "prisexempel", name: "Prisexempel" },
  { id: "kundutlatanden", name: "Kundutlåtanden" },
];

export const fieldTypes = {
  users: {
    id: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
    email: { value: "text" },
    password: { value: "text" },
    resetId: { value: "text" },
  },

  mediaproduktioner: {
    id: { value: "integer" },
    title: { value: "text" },
    qCardLink: { value: "text" },
    screenshot: { value: "fileImg" },
    filmtyp: {
      value: "select",
      select_options: [{ value: "butiksfilm" }, { value: "storbildsfilm" }],
    },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  medarbetare: {
    id: { value: "integer" },
    name: { value: "text" },
    title: { value: "text" },
    phone: { value: "text" },
    email: { value: "text" },
    photo: { value: "fileImg" },
    department: {
      value: "select",
      select_options: [
        { value: "management" },
        { value: "sales" },
        { value: "production" },
      ],
    },
    sortOrder: { value: "integer" },
    adjustx: { value: "real" },
    adjusty: { value: "real" },
    zoom: { value: "real" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  kundutlatanden: {
    id: { value: "integer" },
    title: { value: "text" },
    text: { value: "textarea" },
    att: { value: "text" },
    logo: { value: "fileImg" },
    link: { value: "text" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },

  prisexempel: {
    id: { value: "integer" },
    title: { value: "text" },
    monthly: { value: "text" },
    total: { value: "text" },
    details: { value: "textarea" },
    sortOrder: { value: "integer" },
    createdAt: { value: "date" },
    updatedAt: { value: "date" },
  },
};
