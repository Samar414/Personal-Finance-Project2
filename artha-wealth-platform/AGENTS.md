# AGENTS.md

> Canonical entry point for AI coding agents. Read this file and the relevant linked documentation before making changes.

## Project Overview
A hackathon personal-finance web app with customer and consultant experiences. The project currently has mockup designs only; frontend implementation has not started.

## Documentation Map
- `PRD.md`: product scope, flows, non-goals, and acceptance criteria.
- `ARCHITECTURE.md`: current and planned system structure; planned items are explicitly labeled.
- `DESIGN.md`: design-system source. It remains provisional until the Awesome Design reference is selected.
- `RULES.md`: mandatory project-specific engineering and security rules.
- `TESTING.md`: verified test tooling and required checks; do not assume commands exist before inspecting the repository.
- `DECISIONS.md`: meaningful product/technical decisions and their history.
- `MEMORY.md`: current development status and session handoff.

## Repository and Workflow
Before changing code:
1. Inspect the repository, existing files, package manager, framework, scripts, environment configuration, and CI.
2. Read `PRD.md`, `DESIGN.md`, `ARCHITECTURE.md`, `RULES.md`, and `TESTING.md` relevant to the task.
3. Confirm whether the request is within the MVP scope.
4. If a requirement is ambiguous and materially affects behavior, ask for clarification rather than inventing it.
5. Preserve existing conventions when implementation exists; do not replace architecture or tooling without an explicit decision.

## Development Commands
Not yet verified. Inspect the repository and document only commands that actually exist in package scripts, project configuration, or CI.

## Build Commands
Not yet verified. Do not invent build commands.

## Testing Commands
Not yet verified. Follow `TESTING.md` after inspecting the actual test setup.

## Code Conventions
Not yet established from source code. Once code exists, document observed conventions in `RULES.md` and keep this section concise.

## Architecture Conventions
- Treat `ARCHITECTURE.md` as the implementation map, not a place for unapproved proposals to masquerade as existing systems.
- Keep customer and consultant authorization boundaries explicit.
- Enforce consent and role permissions in trusted data-access/server-side rules, not solely in the UI.
- Keep demo/synthetic data distinguishable from real data.

## Database Conventions
No database has been confirmed or implemented. Once chosen, document the actual schema, migration, and access-control conventions in `ARCHITECTURE.md`.

## API Conventions
No API implementation has been confirmed. Once present, document actual endpoints and patterns in `ARCHITECTURE.md`.

## Security Requirements
- Never commit secrets, API keys, service-role credentials, or real financial data.
- Never trust a role, customer ID, or consent flag supplied only by the client.
- Verify that the authenticated user is authorized for each customer record requested or changed.
- Expense information must not be exposed to a consultant without the customer's active consent.
- A UI-hidden element is not an authorization control.
- Use synthetic/demo data for development and demonstration.

## Dependency Guidelines
Inspect the existing package manager and dependency policy before adding packages. Prefer existing dependencies where suitable. Explain nontrivial additions and avoid unnecessary packages.

## Testing Requirements
Use the actual test tools and commands discovered in the repository. Add tests for permission boundaries and consent behavior when the relevant infrastructure exists. Never claim a test passed unless it was run successfully.

## Verification Checklist
- [ ] Scope matches `PRD.md`.
- [ ] Relevant design guidance in `DESIGN.md` is followed, or clearly marked as pending.
- [ ] Authorization is enforced outside the UI where applicable.
- [ ] Consent rules are covered by tests or a documented manual verification step.
- [ ] Loading, empty, and error states are handled for changed workflows.
- [ ] Relevant tests, lint, type checks, and build commands were run if available.
- [ ] Documentation and `MEMORY.md` are updated after meaningful changes.

## Forbidden Changes
- Do not invent product requirements, commands, framework choices, architecture, or test results.
- Do not introduce live financial integrations, brokerage, statement extraction, or automated investment advice into the MVP without an explicit product decision.
- Do not finalize the visual system before the Awesome Design reference is selected.
- Do not bypass role-based access or customer consent to make a demo easier.
- Do not overwrite unrelated work or replace established project patterns without justification.

## Additional Documentation
For document ownership and project status, see `MEMORY.md`. Record significant decisions in `DECISIONS.md`.
