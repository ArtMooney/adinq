# CLAUDE.md — ADinQ Project Reference

## Project Overview

**ADinQ** is the website of a Swedish DOOH (Digital Out of Home) agency, built with **Nuxt 4** and deployed on
**Cloudflare Pages** with **D1** (SQLite) as the database and **R2** for file storage. The site is in Swedish
(`sv-SE`).

---

## Tech Stack

| Layer        | Technology                                       |
|--------------|--------------------------------------------------|
| Framework    | **Nuxt 4** (Vue 3, Nitro)                        |
| Styling      | **Tailwind CSS v4** (via `@tailwindcss/vite`)    |
| State        | **Pinia** with `pinia-plugin-persistedstate`     |
| Database     | **Cloudflare D1** (SQLite) via **Drizzle ORM**   |
| File storage | **Cloudflare R2**                                |
| Deploy       | **Cloudflare Pages** (`cloudflare_pages` preset) |
| Images       | **@nuxt/image** with the `weserv` provider       |
| Maps         | **Leaflet** via `@nuxtjs/leaflet`                |
| Icons        | **unplugin-icons** with `@iconify/json`          |
| Formatting   | **Prettier** with `prettier-plugin-tailwindcss`  |
| Email        | **Mailgun** (server-side, raw `fetch`)           |
| Charts       | **Chart.js** via `vue-chartjs`                   |
| Drag & drop  | `vue-draggable-next`                             |
| Video        | **Plyr**                                         |
| Dates        | **date-fns**, **@vuepic/vue-datepicker**         |

### Preferences

- **Vue Options API is preferred** for component logic (`data()`, `methods`, `computed`, `watch`, lifecycle hooks).
  Use `<script setup>` only for imports, composables, and other setup-time concerns — keep the main component logic
  in a separate `<script>` block using the Options API.
- **Tailwind CSS 4.2+** is the preferred version. When adding or upgrading dependencies, keep Tailwind on `^4.2`
  or newer.

---

## Frequently Used Commands

### Development

```bash
npm run dev              # Start the Nuxt dev server (with Cloudflare bindings)
npm run build            # Build for production (Cloudflare Pages)
npm run preview          # Preview the production build
npm run generate         # Generate a static site
npm run postinstall      # Runs nuxt prepare (executed automatically after npm install)
```

### Database (Drizzle + D1)

```bash
npm run db:generate          # Generate Drizzle migrations from the schema
npm run db:migrate           # Run migrations against REMOTE (production)
npm run db:migrate:local     # Run migrations against the LOCAL D1 database
npm run db:migrate:dev       # Run migrations against the DEV database
npm run db:studio            # Open Drizzle Studio (remote)
npm run db:studio:local      # Open Drizzle Studio (local)
```

### Database Backup & Sync

```bash
npm run db:export            # Export the remote DB to adinq-backup.sql
npm run db:export:local      # Export the local DB to adinq-backup.sql
npm run db:extract           # Export remote + extract INSERT statements
npm run db:extract:local     # Export local + extract INSERT statements
npm run db:import            # Import INSERT statements into remote
npm run db:import:local      # Import INSERT statements into local
npm run db:import:dev        # Import INSERT statements into dev
npm run db:push              # Sync local → remote (extract local + import remote)
npm run db:pull              # Sync remote → local (extract remote + import local)
```

### Single-table export

```bash
./scripts/extract-table.sh <database-name> <table-name> <output-file>
```

---

## Project Structure

```
adinq/
├── app/                          # Nuxt app directory (frontend)
│   ├── app.vue                   # Root component (schema.org JSON-LD)
│   ├── router.options.ts         # Scroll behavior (smooth scroll to hash)
│   ├── assets/
│   │   ├── css/main.css          # Tailwind entry + fonts import
│   │   ├── css/fonts.css         # @font-face (Hanuman, Poppins)
│   │   └── fonts/                # Local TTF files
│   ├── components/               # Vue components
│   │   ├── cms/                  # CMS admin components
│   │   │   ├── stores/           # CMS-specific Pinia stores (cmsStore, loginStore)
│   │   │   ├── Main.vue          # CMS main view
│   │   │   ├── Login.vue         # CMS login
│   │   │   └── ...               # Items, Inputs, Graph, etc.
│   │   ├── Navbar.vue            # Main navigation
│   │   ├── Footer.vue            # Footer
│   │   └── ...                   # Other page components
│   ├── composables/              # Vue composables
│   │   ├── useCmsSeo.js          # SEO via CMS static content
│   │   ├── useSimpleSeo.js       # Simple SEO meta
│   │   └── useNoIndexSeo.js      # noindex SEO
│   ├── layouts/
│   │   └── default.vue           # Default layout (Navbar + Footer)
│   ├── mixins/
│   │   └── getBreakpoint.js      # Options API mixin for responsive breakpoints
│   ├── pages/                    # File-based routing
│   │   ├── index.vue             # Home page
│   │   ├── admin.vue             # CMS admin panel
│   │   ├── [...slug].vue         # Catch-all route
│   │   └── ...                   # Other pages (Swedish URLs)
│   ├── stores/
│   │   └── static-content.js     # Pinia store for CMS static content
│   └── utils/                    # Helper functions
│       ├── formatText.js
│       ├── emailValidator.js
│       ├── requiredFields.js
│       └── months.js
├── server/                       # Nitro server (backend)
│   ├── api/                      # Public API endpoints (defineEventHandler)
│   │   ├── contact.js            # Contact form → Mailgun
│   │   ├── team.js
│   │   ├── prices.js
│   │   └── ...
│   ├── routes/cms/               # CMS admin API routes (authenticated)
│   │   ├── login.js              # CMS login
│   │   ├── rows.js               # Fetch rows from a table
│   │   ├── add-item.js           # Add row
│   │   ├── save-item.js          # Save row
│   │   ├── delete-item.js        # Delete row
│   │   ├── r2/                   # R2 file handling (upload, delete)
│   │   ├── utils/                # CMS-specific utils (password, auth)
│   │   └── content/              # Email templates
│   ├── db/
│   │   ├── schema.ts             # Drizzle schema (all tables)
│   │   ├── client.ts             # useDrizzle() helper
│   │   └── cmsConfig.ts          # CMS table and field configuration
│   └── utils/
│       ├── check-login.js        # Basic auth check
│       ├── check-authentication.js
│       └── mailgun/send-email.js # Mailgun integration
├── migrations/                   # Drizzle SQL migrations
├── scripts/
│   └── extract-table.sh          # Export a single table
├── public/                       # Static files (favicons, manifest)
├── nuxt.config.ts                # Nuxt configuration
├── drizzle.config.ts             # Drizzle Kit configuration
├── tailwind.config.js            # Tailwind configuration (base styles, plugins)
├── tailwind.cms.styles.js        # CMS-specific Tailwind styles (scoped under .cms-admin)
├── wrangler.toml                 # Cloudflare Workers/Pages configuration
└── .prettierrc                   # Prettier config (tailwindcss-plugin)
```

---

## Database Schema

Defined in `server/db/schema.ts` using Drizzle ORM. All tables have `id`, `sortOrder`, `createdAt`, `updatedAt`.

| Table               | Description                            |
|---------------------|----------------------------------------|
| `users`             | CMS users (email, password)            |
| `mediaproduktioner` | Media productions (title, video, etc.) |
| `medarbetare`       | Team members (name, title, photo)      |
| `kundutlatanden`    | Customer testimonials                  |
| `prisexempel`       | Price examples                         |
| `politisk_reklam`   | Political advertising data             |
| `static_content`    | CMS-managed static content (JSON)      |

CMS configuration lives in `server/db/cmsConfig.ts` — it defines field types, labels and static content per
page/component.

---

## Code Style & Conventions

### General
- **Prettier** with `prettier-plugin-tailwindcss` for automatic formatting
- No ESLint configured
- **ES Modules** (`"type": "module"` in package.json)
- Double quotes (`"`) by default (Prettier default)

### Vue components
- **Options API is preferred.** Components use a hybrid setup: `<script setup>` for imports/composables, and a
  separate `<script>` block with the Options API (`data()`, `methods`, `computed`, `watch`, `mounted`, etc.) for
  the actual component logic.
- **SFC order**: `<script setup>` → `<template>` → `<script>` (Options API)
- Component names: **PascalCase** (e.g. `ColleagueCard.vue`, `MarketingChannels.vue`)
- Page names: **kebab-case** (e.g. `kontakta-oss.vue`, `media-produktion.vue`)

### Server code
- Server files are mostly **`.js`** (not `.ts`), except for `schema.ts`, `client.ts`, `cmsConfig.ts`
- Uses Nuxt auto-imports: `defineEventHandler`, `useRuntimeConfig`, `getHeaders`, `readBody`, `readFormData`,
  `createError`
- Cloudflare D1 is accessed via `event.context.cloudflare.env.DB`
- R2 is accessed via `event.context.cloudflare.env.FILES`
- Import paths: `~~/server/...` (tilde prefix)

### Authentication
- **Two-step auth**: Basic Auth (header) + CMS user login (email/password in body)
- Public APIs (`server/api/`) only require Basic Auth
- CMS routes (`server/routes/cms/`) require both Basic Auth and CMS login

### Pinia stores
- Defined with `defineStore()` (Options syntax, not Setup syntax)
- Static content is loaded once via `useStaticContentStore` in `app.vue`
- CMS-specific stores live in `app/components/cms/stores/`

### Tailwind
- **Tailwind CSS v4** with the Vite plugin (preferred version: **4.2+**)
- Global base styles in `tailwind.config.js` (buttons, inputs, headings, etc.)
- CMS-scoped styles in `tailwind.cms.styles.js` (under `.cms-admin`)
- Fonts: **Hanuman** (headings), **Poppins** (body) — locally hosted
- Color scheme: dark theme (`bg-neutral-900`, `text-white`)

### SEO
- CMS-driven SEO via the `useCmsSeo()` composable
- Simple SEO via `useSimpleSeo()`
- Schema.org JSON-LD in `app.vue` (includes both office locations: Borås and Eskilstuna)
- Robots: blocks indexing on non-main branches
- Sitemap via `@nuxtjs/sitemap`

---

## Environment Variables

Configured in `nuxt.config.ts` → `runtimeConfig`:

### Private (server-only)
- `NUXT_MAILGUN_API_KEY` — Mailgun API key
- `NUXT_EMAIL_FROM` — From address
- `NUXT_EMAIL_TO` — Recipient address
- `NUXT_UNSUBSCRIBE_TO` — Unsubscribe address
- `NUXT_USERNAME` — Basic Auth username
- `NUXT_USERPASS` — Basic Auth password

### Public (exposed to the client)
- `NUXT_PUBLIC_USERNAME` — Public Basic Auth username
- `NUXT_PUBLIC_USERPASS` — Public Basic Auth password
- `NUXT_PUBLIC_IMAGE_BASE_URL` — Base URL for images (R2/weserv)
- `NUXT_PUBLIC_SITE_URL` — Public URL of the site

### Drizzle/Cloudflare (used in drizzle.config.ts)
- `NUXT_CLOUDFLARE_ACCOUNT_ID`
- `NUXT_CLOUDFLARE_DATABASE_ID`
- `NUXT_CLOUDFLARE_DATABASE_ID_DEV`
- `NUXT_CLOUDFLARE_D1_TOKEN`

---

## Key Patterns

### Fetch static content in a page
```js
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Index").content,
);
```

### SEO in a page
```js
useCmsSeo("SEO page - Index");
```

### Server API handler with auth
```js
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const headers = getHeaders(event);
  if (!(await checkLogin(headers, config.userName, config.userPass))) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  // ...
});
```

### Drizzle DB access
```js
const db = useDrizzle(event.context.cloudflare.env.DB);
const rows = await db.select().from(schema[tableName]).orderBy(asc(column)).all();
```
