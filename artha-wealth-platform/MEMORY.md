# Project Memory

## Current Status
- Hackathon personal-finance platform is in the planning/design stage.
- Mockup designs have been created.
- Frontend implementation has not started.
- Eight documentation files are being established as shared context for AI coding agents.
- Final design reference will be selected from the Awesome Design library.

## Recently Completed
- Product concept and initial scope discussed.
- Two experiences identified: customer and financial consultant.
- Initial asset and expense categories and consent requirement identified.
- Candidate stack discussed but not confirmed.

## Currently In Progress
- Preparing baseline project documentation.
- Selecting a final visual design reference remains pending.

## Known Problems
- No repository/codebase has been inspected in this project context.
- Framework, database, hosting, package manager, and test tooling are not confirmed.
- Exact fields and validation rules for asset/expense forms are unresolved.
- Consultant permissions for editing customer assets need precise confirmation.
- Consultant onboarding/approval requirements are unresolved.
- Exact consent wording and audit requirements are unresolved.

## Important Context
- The demo should include approximately 20 synthetic customer profiles.
- Asset classes: mutual funds, equity, fixed deposits (FD), and gold.
- Expenses should support manual entries, categories, and recurring examples such as EMI, rent, and insurance.
- Simulated monthly history should support dashboard trends.
- Customer changes should persist.
- Consultant expense access requires explicit customer consent.
- Fund-level mutual-fund exposure is in scope; underlying stock-level look-through is not required.
- MVP excludes live brokerage, bank linking, automated statement extraction, and automated investment advice.
- Candidate stack previously discussed: React + TypeScript + Vite, Supabase/PostgreSQL, Recharts. This remains a proposal, not an approved decision.

## Recent Decisions
- No implementation-stack decision recorded as approved.
- No final visual-design decision recorded.
- MVP exclusions above are the current scope baseline.

## Next Steps
1. Select the Awesome Design reference and update `DESIGN.md`.
2. Confirm the implementation stack and record the choice in `DECISIONS.md`.
3. Create/provide the repository and inspect its actual structure.
4. Resolve the open questions in `PRD.md` that affect implementation.
5. Update `AGENTS.md`, `ARCHITECTURE.md`, `RULES.md`, and `TESTING.md` based on the real repository.
6. Build the MVP in small, testable slices and update this file after meaningful sessions.

## Things to Be Careful About
- Do not describe proposed architecture as existing implementation.
- Do not invent UI details before the design reference is chosen.
- Enforce consent and role permissions outside the UI.
- Clearly label synthetic data.
- Keep documentation consistent and avoid duplicating whole sections across files.

## Session Handoff
The next agent should read this file and `PRD.md` first, then inspect the repository before coding. The app has mockups only; do not assume a frontend, database, scripts, or tests already exist.
