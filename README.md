# ADinQ website

Use Node.js 24 LTS (24.15 or newer). Run `nvm use` and `npm ci` before building.
Set the Cloudflare Pages build environment to Node.js 24 as well (`NODE_VERSION=24`).

Development and deploy scripts in [package.json](./package.json).

Run `npm test` for isolated authentication and CMS integration tests. They use
in-memory SQLite and stubbed email; no external services are contacted.

Admin authentication uses a random session token in an HttpOnly, SameSite=Strict
browser-session cookie (`adinq_admin_session`). The published site always uses
Secure cookies. D1 stores only the token hash, user ID and an absolute eight-hour
expiry. Logout and password reset revoke sessions on the server. Old `loginStore`
cookies are removed when their owner next requests the site.

Before deploying this change, apply the additive session-table migration to the
target D1 database:

```sh
npm run db:migrate:local # Local development database
npm run db:migrate      # Production database; run intentionally before deployment
```

The new table is defined in `migrations/0006_admin_sessions.sql`. No existing user
or content data needs to be changed. Administrators must log in again after the
update. Public visitors receive no session cookie.

Privacy information lives at `/integritet`. Before publishing, ADinQ should check
the stated legal bases, email/log retention routines and supplier agreements,
including any transfers outside the EU/EEA, against its actual operations.
