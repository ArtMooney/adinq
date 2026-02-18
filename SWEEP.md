# SWEEP.md — ADinQ Project Reference

## Project Overview

**ADinQ** är en svensk DOOH-byrås (Digital Out of Home) webbplats byggd med **Nuxt 4**, deployad på **Cloudflare Pages**
med **D1** (SQLite) som databas och **R2** för fillagring. Sajten är på svenska (`sv-SE`).

---

## Tech Stack

| Lager       | Teknologi                                        |
|-------------|--------------------------------------------------|
| Framework   | **Nuxt 4** (Vue 3, Nitro)                        |
| Styling     | **Tailwind CSS v4** (via `@tailwindcss/vite`)    |
| State       | **Pinia** med `pinia-plugin-persistedstate`      |
| Databas     | **Cloudflare D1** (SQLite) via **Drizzle ORM**   |
| Fillagring  | **Cloudflare R2**                                |
| Deploy      | **Cloudflare Pages** (`cloudflare_pages` preset) |
| Bilder      | **@nuxt/image** med `weserv`-provider            |
| Kartor      | **Leaflet** via `@nuxtjs/leaflet`                |
| Ikoner      | **unplugin-icons** med `@iconify/json`           |
| Formatering | **Prettier** med `prettier-plugin-tailwindcss`   |
| E-post      | **Mailgun** (server-side)                        |
| Grafer      | **Chart.js** via `vue-chartjs`                   |
| Drag & drop | `vue-draggable-next`                             |
| Video       | **Plyr**                                         |
| Datum       | **date-fns**, **@vuepic/vue-datepicker**         |

---

## Frequently Used Commands

### Development

```bash
npm run dev              # Starta Nuxt dev-server (med Cloudflare bindings)
npm run build            # Bygg för produktion (Cloudflare Pages)
npm run preview          # Förhandsgranska produktionsbygge
npm run generate         # Generera statisk sajt
npm run postinstall      # Kör nuxt prepare (körs automatiskt efter npm install)
```

### Database (Drizzle + D1)

```bash
npm run db:generate          # Generera Drizzle-migrationer från schema
npm run db:migrate           # Kör migrationer mot REMOTE (produktion)
npm run db:migrate:local     # Kör migrationer mot LOKAL D1-databas
npm run db:migrate:dev       # Kör migrationer mot DEV-databas
npm run db:studio            # Öppna Drizzle Studio (remote)
npm run db:studio:local      # Öppna Drizzle Studio (lokal)
```

### Database Backup & Sync

```bash
npm run db:export            # Exportera remote DB till adinq-backup.sql
npm run db:export:local      # Exportera lokal DB till adinq-backup.sql
npm run db:extract           # Exportera remote + extrahera INSERT-satser
npm run db:extract:local     # Exportera lokal + extrahera INSERT-satser
npm run db:import            # Importera INSERT-satser till remote
npm run db:import:local      # Importera INSERT-satser till lokal
npm run db:import:dev        # Importera INSERT-satser till dev
npm run db:push              # Synka lokal → remote (extract local + import remote)
npm run db:pull              # Synka remote → lokal (extract remote + import local)
```

### Enskild tabell-export

```bash
./scripts/extract-table.sh <database-name> <table-name> <output-file>
```

---

## Project Structure

```
adinq/
├── app/                          # Nuxt app-katalog (frontend)
│   ├── app.vue                   # Root-komponent (schema.org JSON-LD)
│   ├── router.options.ts         # Scroll-beteende (smooth scroll till hash)
│   ├── assets/
│   │   ├── css/main.css          # Tailwind entry + fonts import
│   │   ├── css/fonts.css         # @font-face (Hanuman, Poppins)
│   │   └── fonts/                # Lokala TTF-filer
│   ├── components/               # Vue-komponenter
│   │   ├── cms/                  # CMS admin-komponenter
│   │   │   ├── stores/           # CMS-specifika Pinia stores (cmsStore, loginStore)
│   │   │   ├── Main.vue          # CMS huvudvy
│   │   │   ├── Login.vue         # CMS inloggning
│   │   │   └── ...               # Items, Inputs, Graph, etc.
│   │   ├── Navbar.vue            # Huvudnavigering
│   │   ├── Footer.vue            # Sidfot
│   │   └── ...                   # Övriga sidkomponenter
│   ├── composables/              # Vue composables
│   │   ├── useCmsSeo.js          # SEO via CMS static content
│   │   ├── useSimpleSeo.js       # Enkel SEO-meta
│   │   └── useNoIndexSeo.js      # noindex SEO
│   ├── layouts/
│   │   └── default.vue           # Standard layout (Navbar + Footer)
│   ├── mixins/
│   │   └── getBreakpoint.js      # Options API mixin för responsiva breakpoints
│   ├── pages/                    # Filbaserad routing
│   │   ├── index.vue             # Startsida
│   │   ├── admin.vue             # CMS admin-panel
│   │   ├── [...slug].vue         # Catch-all route
│   │   └── ...                   # Övriga sidor (svenska URL:er)
│   ├── stores/
│   │   └── static-content.js     # Pinia store för CMS static content
│   └── utils/                    # Hjälpfunktioner
│       ├── formatText.js
│       ├── emailValidator.js
│       ├── requiredFields.js
│       └── months.js
├── server/                       # Nitro server (backend)
│   ├── api/                      # Publika API-endpoints (defineEventHandler)
│   │   ├── contact.js            # Kontaktformulär → Mailgun
│   │   ├── team.js
│   │   ├── prices.js
│   │   └── ...
│   ├── routes/cms/               # CMS admin API-routes (autentiserade)
│   │   ├── login.js              # CMS inloggning
│   │   ├── rows.js               # Hämta rader från tabell
│   │   ├── add-item.js           # Lägg till rad
│   │   ├── save-item.js          # Spara rad
│   │   ├── delete-item.js        # Ta bort rad
│   │   ├── r2/                   # R2 filhantering (upload, delete)
│   │   ├── utils/                # CMS-specifika utils (password, auth)
│   │   └── content/              # E-postmallar
│   ├── db/
│   │   ├── schema.ts             # Drizzle schema (alla tabeller)
│   │   ├── client.ts             # useDrizzle() helper
│   │   └── cmsConfig.ts          # CMS tabell- och fältkonfiguration
│   └── utils/
│       ├── check-login.js        # Basic auth-kontroll
│       ├── check-authentication.js
│       └── mailgun/send-email.js # Mailgun integration
├── migrations/                   # Drizzle SQL-migrationer
├── scripts/
│   └── extract-table.sh          # Exportera enskild tabell
├── public/                       # Statiska filer (favicons, manifest)
├── nuxt.config.ts                # Nuxt-konfiguration
├── drizzle.config.ts             # Drizzle Kit-konfiguration
├── tailwind.config.js            # Tailwind-konfiguration (base styles, plugins)
├── tailwind.cms.styles.js        # CMS-specifika Tailwind-stilar (.cms-admin scope)
├── wrangler.toml                 # Cloudflare Workers/Pages-konfiguration
└── .prettierrc                   # Prettier config (tailwindcss-plugin)
```

---

## Database Schema

Definierat i `server/db/schema.ts` med Drizzle ORM. Alla tabeller har `id`, `sortOrder`, `createdAt`, `updatedAt`.

| Tabell              | Beskrivning                           |
|---------------------|---------------------------------------|
| `users`             | CMS-användare (email, password)       |
| `mediaproduktioner` | Mediaproduktioner (titel, film, etc)  |
| `medarbetare`       | Medarbetare (namn, titel, foto)       |
| `kundutlatanden`    | Kundutlåtanden / testimonials         |
| `prisexempel`       | Prisexempel                           |
| `politisk_reklam`   | Politisk reklam-data                  |
| `static_content`    | CMS-hanterat statiskt innehåll (JSON) |

CMS-konfiguration finns i `server/db/cmsConfig.ts` — definierar fälttyper, labels och statiskt innehåll per
sida/komponent.

---

## Code Style & Conventions

### Generellt
- **Prettier** med `prettier-plugin-tailwindcss` för automatisk formatering
- Ingen ESLint konfigurerad
- **ES Modules** (`"type": "module"` i package.json)
- Dubbla citattecken (`"`) som standard (Prettier default)

### Vue-komponenter
- **Hybrid Options API + `<script setup>`**: Många komponenter använder både `<script setup>` (för imports/composables)
  och en separat `<script>` med Options API (`data()`, `methods`, `computed`, `watch`, `mounted`, etc.)
- **SFC-ordning**: `<script setup>` → `<template>` → `<script>` (Options API)
- Komponentnamn: **PascalCase** (t.ex. `ColleagueCard.vue`, `MarketingChannels.vue`)
- Sidnamn: **kebab-case** (t.ex. `kontakta-oss.vue`, `media-produktion.vue`)

### Server-kod
- Server-filer är mestadels **`.js`** (inte `.ts`), förutom `schema.ts`, `client.ts`, `cmsConfig.ts`
- Använder Nuxt auto-imports: `defineEventHandler`, `useRuntimeConfig`, `getHeaders`, `readBody`, `readFormData`,
  `createError`
- Cloudflare D1 nås via `event.context.cloudflare.env.DB`
- R2 nås via `event.context.cloudflare.env.FILES`
- Importvägar: `~~/server/...` (tilde-prefix)

### Autentisering
- **Tvåstegs-auth**: Basic Auth (header) + CMS-användarinloggning (email/password i body)
- Publika API:er (`server/api/`) kräver bara Basic Auth
- CMS-routes (`server/routes/cms/`) kräver Basic Auth + CMS-inloggning

### Pinia Stores
- Definierade med `defineStore()` (Options-syntax, inte Setup-syntax)
- Statiskt innehåll laddas en gång via `useStaticContentStore` i `app.vue`
- CMS-specifika stores ligger i `app/components/cms/stores/`

### Tailwind
- **Tailwind CSS v4** med Vite-plugin
- Globala base-stilar i `tailwind.config.js` (knappar, inputs, headings, etc.)
- CMS-scopade stilar i `tailwind.cms.styles.js` (under `.cms-admin`)
- Typsnitt: **Hanuman** (headings), **Poppins** (body) — lokalt hostade
- Färgschema: Mörkt tema (`bg-neutral-900`, `text-white`)

### SEO
- CMS-driven SEO via `useCmsSeo()` composable
- Enkel SEO via `useSimpleSeo()`
- Schema.org JSON-LD i `app.vue`
- Robots: blockerar indexering på icke-main branches
- Sitemap via `@nuxtjs/sitemap`

---

## Environment Variables

Konfigurerade via `nuxt.config.ts` → `runtimeConfig`:

### Privata (server-only)
- `NUXT_MAILGUN_API_KEY` — Mailgun API-nyckel
- `NUXT_EMAIL_FROM` — Avsändaradress
- `NUXT_EMAIL_TO` — Mottagaradress
- `NUXT_UNSUBSCRIBE_TO` — Avregistreringsadress
- `NUXT_USERNAME` — Basic Auth användarnamn
- `NUXT_USERPASS` — Basic Auth lösenord

### Publika (exponeras till klient)
- `NUXT_PUBLIC_USERNAME` — Publikt Basic Auth användarnamn
- `NUXT_PUBLIC_USERPASS` — Publikt Basic Auth lösenord
- `NUXT_PUBLIC_IMAGE_BASE_URL` — Bas-URL för bilder (R2/weserv)
- `NUXT_PUBLIC_SITE_URL` — Sajtens publika URL

### Drizzle/Cloudflare (används i drizzle.config.ts)
- `NUXT_CLOUDFLARE_ACCOUNT_ID`
- `NUXT_CLOUDFLARE_DATABASE_ID`
- `NUXT_CLOUDFLARE_DATABASE_ID_DEV`
- `NUXT_CLOUDFLARE_D1_TOKEN`

---

## Key Patterns

### Hämta statiskt innehåll i en sida
```js
const staticContentStore = useStaticContentStore();
const staticContent = computed(
  () => staticContentStore.getContentByTitle("page - Index").content,
);
```

### SEO i en sida
```js
useCmsSeo("SEO page - Index");
```

### Server API-handler med auth
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

### Drizzle DB-access
```js
const db = useDrizzle(event.context.cloudflare.env.DB);
const rows = await db.select().from(schema[tableName]).orderBy(asc(column)).all();
```
