# D1 and Drizzle Command Reference

## Drizzle Studio
### Open Studio locally
```bash
# Local
USE_LOCAL_DB=true
npx drizzle-kit studio

# Remote
USE_LOCAL_DB=false
npx drizzle-kit studio
```

## Schema Changes & Migrations

### 1. Generate migrations after schema changes
```bash
npx drizzle-kit generate
and then
npx drizzle-kit migrate
```

### 2. Apply migrations locally
```bash
npx wrangler d1 execute [d1_database_name] --local --file=./migrations/[XXXX_migration_name].sql
```

### 3. Apply migrations to Cloudflare D1
```bash
npx wrangler d1 execute [d1_database_name] --remote --file=./migrations/[XXXX_migration_name].sql
```

### Push schema directly (without migration files)
```bash
# Local
USE_LOCAL_DB=true
npx drizzle-kit push

# Remote
USE_LOCAL_DB=false
npx drizzle-kit push
```

## Export & Import

### Export from Cloudflare D1 to file
```bash
npx wrangler d1 export [d1_database_name] --remote --output=[filename].sql
```

### Export from local database to file
```bash
npx wrangler d1 export [d1_database_name] --local --output=[filename].sql
```

### Import to Cloudflare D1 from file
```bash
npx wrangler d1 execute [d1_database_name] --remote --file=./[filename].sql

if there is already tables, only use data from the file with
grep "^INSERT" [db_name].sql > [file_data_only].sql

and then
npx wrangler d1 execute [d1_database_name] --remote --file=./[file_data_only].sql
```

### Import to local database from file
```bash
npx wrangler d1 execute [d1_database_name] --local --file=./[filename].sql

if there is already tables, only use data from the file with
grep "^INSERT" [db_name].sql > [file_data_only].sql

and then
npx wrangler d1 execute [d1_database_name] --local --file=./[file_data_only].sql
```

### Sync from Cloudflare D1 to local
```bash
# 1. Export from remote
npx wrangler d1 export [d1_database_name] --remote --output=[filename].sql

# 2. Import to local
npx wrangler d1 execute [d1_database_name] --local --file=./[filename].sql
```

### Sync from local to Cloudflare D1
```bash
# 1. Export from local
npx wrangler d1 export [d1_database_name] --local --output=[filename].sql

# 2. Import to remote
npx wrangler d1 execute [d1_database_name] --remote --file=./[filename].sql
```

## Wrangler Development

### Start local development environment
```bash
npm run dev
# or
npx wrangler dev
```

### List databases
```bash
npx wrangler d1 list
```

### Info about specific database
```bash
npx wrangler d1 info [d1_database_name]
```

## Export live data and import in new database locally

### 1. Exportera from D1 live
```bash
npx wrangler d1 export [d1_database_name] --remote --output=fresh-data.sql
```

### 2. Delete local database
```bash
rm ./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite
```

### 3. Start dev (create new and empty database)
```bash
npm run dev
```

### Ctrl+C a few seconds after the new database is created

### 4. Import fresh data
```bash
npx wrangler d1 execute [d1_database_name] --local --file=./fresh-data.sql
```

### 5. Verify in Studio
```bash
USE_LOCAL_DB=true npx drizzle-kit studio
```