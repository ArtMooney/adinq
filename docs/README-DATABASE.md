# Databas - Snabbguide

## 📦 Vanliga kommandon

### Utveckling (lokalt)
```bash
npm run dev                    # Starta dev-server
npm run db:studio:local        # Öppna Drizzle Studio (redigera data)
```

### Schema-ändringar
```bash
npm run db:generate            # Skapa migration från schema
npm run db:migrate:local       # Applicera migration lokalt
npm run db:migrate:remote      # Applicera migration i produktion
```

### Synka data
```bash
npm run db:pull                # Hämta data från produktion → lokalt
npm run db:push-data           # Pusha lokal data → produktion (var försiktig!)
```

## 🔄 Vanligt workflow

### 1. Ändra schema
1. Redigera `server/db/schema.ts`
2. `npm run db:generate`
3. `npm run db:migrate:local`
4. Testa i Drizzle Studio: `npm run db:studio:local`

### 2. Gå live
1. `npm run db:migrate:remote` (migrations)
2. `npm run build`
3. Deploy via Cloudflare Pages

### 3. Testa med prod-data lokalt
1. `npm run db:pull` (hämtar data från produktion)
2. Testa lokalt
3. Gör inga changes i produktion förrän du testat!

## ⚠️ Vanliga problem

**"Could not find local database"**
```bash
npx wrangler d1 execute adinq --local --command="SELECT 1"
```

**Vill se migrations som körts**
```bash
wrangler d1 migrations list adinq --local     # Lokalt
wrangler d1 migrations list adinq --remote    # Produktion
```

**Tabeller finns redan vid import**
→ Det är ok! Våra scripts filtrerar bort schema och importerar bara data (INSERT).

## 📝 Tips

- `updatedAt` uppdateras automatiskt - behöver inte sättas manuellt
- Backup-filer (`backup-*.sql`) är gitignorerade
- Använd Drizzle Studio för att fylla i testdata
- Testa alltid lokalt innan deploy

## 🔗 Länkar

- Drizzle Docs: https://orm.drizzle.team/docs/overview
- Cloudflare D1 Docs: https://developers.cloudflare.com/d1/