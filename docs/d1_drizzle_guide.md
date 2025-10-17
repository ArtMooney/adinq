# D1 and Drizzle Guide

## Drizzle Commands
- `npx drizzle-kit generate`: Generates migration files based on the schema.
- `npx drizzle-kit studio`: Starts Drizzle Studio for visual data editing.
- `npx wrangler d1 execute adinq --file=./migrations/0000_silky_rafael_vega.sql --local`: Applies migrations locally.
- `npx wrangler d1 execute adinq --file=./migrations/0000_silky_rafael_vega.sql --remote`: Applies migrations to remote
  D1.

## Import and Export Commands
- `npx wrangler d1 export adinq --remote --output=adinq-backup.sql`: Exports the entire database to a file.
- `npx wrangler d1 import adinq adinq-backup.sql --remote`: Imports data from a file into the database.
