<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop

Early-stage App Router app: Next.js 16.4 (Turbopack, React Compiler, Cache Components) + React 19.3, shadcn `base-nova` on Base UI, Better Auth backed by MongoDB. There is no test suite or CI yet.

## Commands

- Use npm (`package-lock.json` is the only lockfile).
- `npm run dev` / `npm run build` / `npm start`
- `npm run lint` — ESLint flat config. Next 16 removed `next lint`.
- `npx tsc --noEmit` — the only typecheck; there is no `typecheck` or `test` script.

## Next.js 16 constraints

- `cacheComponents: true` and `partialPrefetching: true` are enabled in `next.config.ts`. Uncached/dynamic reads outside `<Suspense>` can fail prerendering: use `"use cache"` + `cacheLife()`, add Suspense, or opt a route out with `export const instant = false`. Read `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` before changing data fetching.
- Request APIs are async-only: `await cookies()`, `headers()`, `params`, `searchParams`. Page/layout props use generated globals like `LayoutProps<"/">`.
- Turbopack is the default for `dev` and `build`. `middleware.ts` is deprecated in favor of `proxy.ts`.

## Layout

- `src/app` — App Router pages/layouts. `src/app/api/auth/[...all]/route.ts` is the Better Auth catch-all (`toNextJsHandler`).
- `src/lib/auth.ts` — server auth config (MongoDB). `src/lib/auth-client.ts` — browser client.
- `src/components` — app components (e.g. `navbar.tsx`); `src/components/ui` — shadcn-generated components; `src/hooks`, `src/lib`.
- Alias `@/*` → `src/*` (see `tsconfig.json`).

## UI conventions

- `components.json` uses the shadcn `base-nova` style, so primitives come from `@base-ui/react`, not Radix. Add components with `npx shadcn@latest add <name>` instead of adapting Radix examples.
- Generated components import `cn` from the `"cn"` package (not `clsx`/`tailwind-merge`); `@/lib/utils` just re-exports it.
- Tailwind v4 is CSS-first: theme tokens live in `src/app/globals.css`; there is no `tailwind.config.*`. CSS is handled by the `@tailwindcss/turbopack` rule in `next.config.ts`, not PostCSS.

## Auth and environment

- Auth requires `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` in `.env` (gitignored; currently present).
- `src/lib/auth.ts` hardcodes the MongoDB connection (`mongodb://localhost:27017/database`, db `hireloopdb`); run MongoDB locally before testing auth.
- Google/GitHub providers expect `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` and `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`; these are absent from `.env`, so social sign-in will fail until configured.
- `src/lib/auth-client.ts` exports `authClient` plus `signIn`/`signUp`/`useSession` from a second client created without `baseURL`; prefer `authClient.*` or consolidate the clients.
