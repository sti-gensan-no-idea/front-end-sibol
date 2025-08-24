# Atuna Frontend — Multi-Role Sign-Up Flow (Claude Context)

Implement a 4-step sign-up wizard for **Developer, Broker, Agent, Client**. Use the provided PNGs as the canonical layout for EVERY role:

- Developer_Step1.png — Step 1 (Personal Info) baseline
- Developer_Step2.png — Step 2 (OTP)
- Developer_Step3.png — Step 3 (Credentials + right “Verification Status” card)
- Developer_Step4.png — Step 4 (Review & Submit)

**Do not improvise layout or styles.** Replicate paddings, stepper, sidebar, and button treatments exactly.

## Stack
- React 18 + TypeScript, Vite
- TailwindCSS + HeroUI (@heroui/react)
- react-router-dom
- React Hook Form + Zod
- Toast provider already mounted

## Routing
Mount under `/signup/:role/*`, where `role` is one of `developer | broker | agent | client`.  
Child routes: `personal`, `verify-email`, `credentials`, `review`.  
Unknown role → 404/redirect to a simple role picker page.

## Role Configuration
Centralize role differences in `src/features/signup/roleConfig.ts`. Keep UI identical; only labels/requirements change.

- **Developer**
  - Badge: “Verified Developer Badge”
  - Credentials: DHSUD/CPD Certificate (optional), LTS (optional)
  - Extra personal field: Company Name (optional)

- **Broker**
  - Badge: “Verified Broker Badge”
  - Credentials: PRC License (required), Government ID (optional)
  - Extra personal field: PRC Number (optional text field)

- **Agent**
  - Badge: “Verified Agent Badge”
  - Credentials: PRC License (optional), Government ID (optional)
  - Extra personal field: PRC Number (optional text field)

- **Client**
  - Badge: “Verified Client”
  - Credentials: Government ID (optional)
  - No extra personal fields

All uploads accept `PDF/JPG/PNG`, `max 5MB`. Show chips and allow remove.
## Files to Create
src/features/signup/
SignUpRoutes.tsx
SignUpLayout.tsx
roleConfig.ts
state.ts
validation.ts
components/
Stepper.tsx
OtpInput.tsx
FileDropzone.tsx
steps/
StepPersonalInfo.tsx
StepOtp.tsx
StepCredentials.tsx
StepReview.tsx
src/lib/api/signup.ts

## State & Validation
- Keep flow state in a local context (`state.ts`) with `role` derived from the URL.
- `validation.ts`: Zod schemas per step (email required/valid; OTP 6 digits; file types/size).
- Persist to `sessionStorage` between steps.

## API (role-aware)
`src/lib/api/signup.ts` exposes:
- `requestOtp(email: string, role: Role): Promise<void>`
- `verifyOtp(args: { email: string; code: string; role: Role }): Promise<{ verified: boolean }>`
- `uploadCredential(file: File, meta: { role: Role; key: string }): Promise<{ url: string }>`
- `submitApplication(payload: { role: Role; personal: Personal; files: Record<string, string> }): Promise<{ id: string }>`
Use existing client helpers where available. No secrets or hardcoded tokens.

## UI Rules (match PNGs)
- Left vertical icon rail and top stepper look/spacing exactly the same.
- Step 2 OTP: 6 boxes, auto-advance, paste fills, backspace moves back, countdown “Resend code in Xs”.
- Step 3 credentials list renders from `ROLE_CONFIG[role].credentials`. If only one item, center spacing to keep balance.
- Right “Verification Status” card reflects the current role’s badge label.
- Buttons: primary for main action, text/ghost for Back.

## Accessibility
- Labels for all fields; `aria-invalid` and `aria-describedby` on errors.
- Keyboard and screen-reader friendly OTP component.

## Definition of Done
- Visual parity with screenshots at 1280+, 1024, 768 widths.
- Validation + toasts for errors.
- Role switching via URL updates text/credential items without layout shifts.
- TypeScript passes in `strict` mode. No console errors.

## Test Ideas
- OTP entry (typing, paste, backspace, countdown enable)
- File validation (type/size), chips add/remove
- Role-based rendering (broker vs client credentials)
- Route guard on unknown roles
