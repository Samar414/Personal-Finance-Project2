# Project Rules

> These rules reflect confirmed product constraints and security requirements. Add implementation-specific conventions only after inspecting the codebase.

## General Rules
- Follow `PRD.md` for product scope and acceptance criteria.
- Mark unresolved requirements rather than guessing.
- Keep simulated financial data visibly identified as demo data.
- Keep MVP and future features separate.

## Code Organization
- Follow existing repository conventions once code exists.
- Avoid duplicating domain logic between customer and consultant interfaces.
- Keep role-specific presentation separate from shared domain behavior where the chosen architecture permits.

## Naming Conventions
Not yet established. Inspect the chosen stack and existing code before documenting exact casing or file-naming rules.

## Type Safety
Use the type-safety features of the selected language/framework where available. Define concrete types for financial records and permission-related state; do not use unvalidated client payloads as trusted domain data.

## Error Handling
- Handle failed reads/writes and validation errors explicitly.
- Avoid exposing secrets, internal stack traces, or sensitive information in user-facing errors.
- Do not silently report a failed save as successful.

## API Rules
- Validate input at the trusted boundary.
- Authorize every customer-specific read and write.
- Do not rely on frontend route guards or hidden controls as the only protection.
- Never trust client-supplied role or consent values without checking trusted records.

## Database Rules
- Database not yet selected.
- When selected, document migrations, constraints, and access policies in `ARCHITECTURE.md`.
- Apply access restrictions to customer financial records.
- Treat expense-consent revocation as effective for subsequent access checks.

## Security Rules
- Do not commit secrets, credentials, private keys, or service-role tokens.
- Do not use real customer financial data for the hackathon demo.
- A consultant must not read a customer's expenses unless the customer's consent is active.
- Verify record ownership and consultant authorization for every relevant operation.
- Do not bypass authorization for convenience during demos.

## Dependency Rules
- Inspect existing dependencies and package manager before adding a library.
- Avoid adding dependencies for functionality already adequately supported by the chosen stack.
- Record significant technology choices in `DECISIONS.md`.

## UI Rules
- Follow `DESIGN.md`; treat unresolved visual values as pending until the reference is selected.
- Include useful loading, empty, validation, and error states.
- Clearly label demo/simulated financial information.
- Make consent status and the effect of granting/revoking consent understandable.

## State Management
Not yet established. Choose state management based on the confirmed stack and actual requirements; avoid duplicating server-owned financial data as independent sources of truth in multiple views.

## Testing Rules
- Follow the actual tools documented in `TESTING.md`.
- Add coverage for role access, consent, and persistence behavior when those capabilities are implemented.
- Never claim checks passed unless they were actually run.

## Git Rules
- Follow repository/team conventions once established.
- Do not overwrite unrelated work or include secrets in commits.
- Keep changes focused and explain meaningful changes.

## Performance Rules
- Avoid premature optimization.
- Ensure dashboard charts and tables remain usable with the expected demo dataset of approximately 20 synthetic customers.

## Forbidden Practices
- Do not invent product requirements or treat proposed technology as approved.
- Do not present demo data as live data.
- Do not expose consultant expense views without active customer consent.
- Do not add live bank/brokerage integration, automated statement extraction, or automated investment advice to the MVP without an explicit decision.
- Do not finalize design tokens before the Awesome Design reference is selected.
