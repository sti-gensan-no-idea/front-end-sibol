You are my **implementation agent**. Your ONLY job is to integrate our **live FastAPI (Python 3) backend** into our existing **React + TypeScript** Atuna frontend. **Do not redesign, restyle, or reorganize any frontend code.** Use the current components and layouts exactly as they are. Your changes must be minimal, typed, and focused solely on wiring the API + state.

Authoritative API (read-only; do not paste large blobs):
- OpenAPI JSON: https://api.atuna.org/openapi.json
- Swagger: https://api.atuna.org/docs
- ReDoc: https://api.atuna.org/redoc

================================================================================
HARD GUARDRAILS (DO NOT DEVIATE)
================================================================================
1) **Integration only**: No UI/UX changes, no CSS changes, no component rewrites, no folder reshuffles, no renames unless strictly required to compile.
2) **No hardcoded domain data**: All lists/enums/options/pagination/sorting must come from the backend.
3) **Types end-to-end**: Generate types from OpenAPI and use them for requests, responses, and component props. Avoid `any`.
4) **Env-driven config**: API base URL and secrets from `.env` only; never inline secrets or URLs.
5) **Use existing patterns**: If the repo has an HTTP client, store, hooks, or query setup, extend it; do not replace it.
6) **Short, diff-first outputs**: After each step, show “Changed files” and concise unified diffs/file snapshots. No long narratives.
7) **Choose the simplest spec-consistent path**: If the spec is ambiguous, proceed with the most conservative, typed approach. Do not invent endpoints.
8) **Performance-sensitive**: Optimize network usage and re-renders (details below) without visual or structural changes.

================================================================================
STATE MANAGEMENT POLICY
================================================================================
- **Server state**: Use **@tanstack/react-query** for ALL backend data (queries/mutations, caching, pagination, invalidation).
- **Auth state**:
  - If OpenAPI uses bearer tokens: minimal in-memory token store (`getToken/setToken/clearToken`), attach `Authorization` only when present, clear on 401 if no refresh endpoint exists.
  - If cookie/session: set `credentials: 'include'` and do NOT store tokens.
- **Client/UI state**: Reuse existing local state or store if present (Redux/Zustand/etc.). Do not add new client-state libs.
- **Query keys**: Centralize per feature (e.g., `src/features/<tag>/keys.ts`) for stability and selective invalidation.
- **Single source of truth**: Backend is authoritative—no duplicate caches or mirror stores.

================================================================================
PERFORMANCE / OPTIMIZATION POLICY (NO UI CHANGES)
================================================================================
- Prefer `queryClient.setQueryData` + targeted `invalidateQueries`.
- Tune `staleTime`/`gcTime` per list/detail where obvious from usage.
- Use `select` in React Query to pick minimal data slices.
- Memoize expensive derived values with `useMemo`/`useCallback`—no layout changes.
- Respect server pagination; do not fetch-all unless required by spec.
- Avoid re-renders: keep query-enabled conditions precise; use `enabled` flags properly.

================================================================================
ALLOWED LIBRARIES (ONLY IF MISSING)
================================================================================
- `@tanstack/react-query`
- `openapi-typescript` (types)
- `openapi-fetch` (typed client if no existing client)
- `react-hook-form`, `zod`, `@hookform/resolvers` (wire existing forms; do not introduce new UI)

================================================================================
ENVIRONMENT
================================================================================
Create/ensure `.env` (do not commit secrets):
VITE_API_BASE_URL=https://api.atuna.org
CHATBASE_SECRET=***set-in-server-only***   # never expose to client

Ensure frontend reads `import.meta.env.VITE_API_BASE_URL`.

================================================================================
OUTPUT FORMAT (EVERY STEP)
================================================================================
- A one-line step header.
- **Changed files** (paths).
- Minimal unified diffs or file snapshots (≤ ~200 lines total per message). Split across steps if needed.

================================================================================
EXECUTION PLAN (FOLLOW IN ORDER)
================================================================================

STEP 0 — Quiet Survey (no output spam)
- Load `openapi.json` and note: `servers[0].url`, `securitySchemes` (bearer vs cookie), and major tags (auth, users, properties, developers, agents, leads, bookmarks/favorites, uploads).
- Inspect repo for existing HTTP client, query provider, auth hooks, and forms.
- Do NOT paste large spec excerpts.

STEP 1 — Types & Scripts (no UI touched)
- Add NPM script:
  - `"gen:api": "openapi-typescript https://api.atuna.org/openapi.json -o src/generated/atuna.d.ts"`
- Generate types:
  - `npx openapi-typescript https://api.atuna.org/openapi.json -o src/generated/atuna.d.ts`
- **Output:** `package.json` script diff + `src/generated/atuna.d.ts` header snippet only. Do not paste full file.

STEP 2 — Typed API Client (reuse existing if present)
- If an HTTP client exists, extend with `paths` from `src/generated/atuna.d.ts` and attach auth headers conditionally.
- If none, create `src/lib/api/client.ts` using `openapi-fetch`, `baseUrl` from env, `credentials: 'include'` if cookie auth, or dynamic `Authorization` header if bearer.
- **Output:** Only the client file diff(s). No style changes.

STEP 3 — React Query Setup (ONLY if missing)
- Add `src/lib/query/client.ts` with a `QueryClient` (retry=1; tuned `staleTime` per feature later).
- Wrap app root with `QueryClientProvider` without altering layout.
- **Output:** minimal diffs.

STEP 4 — Auth Wiring (no visual changes)
- Wire existing login form/page to spec endpoints (e.g., `/auth/login`, `/auth/logout`, `/auth/me`, `/auth/refresh` if present).
- Implement minimal token store if bearer; handle 401s (logout + redirect).
- Add a small route guard (e.g., `src/routes/ProtectedRoute.tsx`) that uses `/me` to confirm session.
- **Output:** diffs for hooks/services only; reuse current components.

STEP 5 — Feature Integration by Tag (strictly reuse screens)
Order: `auth → users → properties → developers → agents → leads → bookmarks/favorites → uploads (if any)`
For each tag:
1) Replace mocks with typed queries using the client.
2) Respect server query params for pagination/sort/filter.
3) Add detail fetch by ID.
4) Wire create/edit forms to POST/PUT/PATCH using generated types (`zod` only to mirror backend constraints, no new UI).
5) For selects/enums/options, **fetch via endpoints**; never inline arrays.
6) Use existing spinners/skeletons/empty states; do not change visuals.
- **Output:** Per-feature small diffs (hooks/services + tiny component call sites).

STEP 6 — Uploads (only if defined)
- If OpenAPI exposes multipart: create `src/lib/api/upload.ts` with a `FormData` helper and wire existing inputs.
- **Output:** helper + call-site diffs.

STEP 7 — Role/Permission (only if backend returns)
- If `/me` returns roles/permissions, add `hasRole()` helper and use it exactly where the code already gates features.
- **Output:** helper + minimal call-site diffs.

STEP 8 — Chatbase Helpdesk Chatbubble (identity verified)
**Goal**: Embed Chatbase bubble without changing site layout, and send verified identity via server-side hash.

A) **Server-side hash (FastAPI)**
- Add a backend endpoint (or extend an existing one) that returns `user_id` and `user_hash = HMAC_SHA256(user_id, CHATBASE_SECRET)`.
- Use `CHATBASE_SECRET` from server env; never expose it client-side.
- Response shape (example):
  ```json
  { "user_id": "<uuid>", "user_hash": "<hex>" }
