# Testing Strategy

> Status: Initial testing plan. No testing framework, scripts, or CI setup have been verified because frontend implementation has not started.

## Testing Philosophy
Verify customer-facing behavior, persistence, role boundaries, and especially the consent rule. Test tools and commands must be selected or documented only after inspecting the actual repository.

## Test Stack
Not yet selected or verified.

## Unit Testing
When implementation exists, test isolated calculations and domain rules, including:
- Asset and expense validation.
- Expense categorization and recurring-record behavior.
- Formatting and aggregation of simulated monthly history.
- Permission decision logic where it can be tested in isolation.

Do not invent a test framework or command before the stack is confirmed.

## Integration Testing
Verify interactions between UI, trusted data-access logic, authentication, and persistence once these layers exist. Prioritize:
- Saving and retrieving asset/expense changes.
- Correct customer ownership and consultant access.
- Consent grant and revocation behavior.
- Correct handling of empty and failed responses.

## End-to-End Testing
The intended end-to-end flows are:
1. Customer registers/signs in and reviews the dashboard.
2. Customer adds or updates an asset and sees the change reflected.
3. Customer adds an expense and reviews category/monthly summaries.
4. Customer grants consent; an authorized consultant can then access permitted expense information.
5. Customer revokes consent; subsequent consultant access is blocked.
6. Consultant browses the customer directory and opens a customer profile.
7. A consultant without the necessary permission cannot access restricted customer information.

Choose an E2E framework only after inspecting the chosen stack and project needs.

## API Testing
No API implementation is confirmed. If an API/server-action boundary is used, test authentication, input validation, record-level authorization, and consent enforcement there.

## Database Testing
No database is confirmed. Once selected, test access policies/constraints and ensure unauthorized access is denied independently of the UI.

## Mocking Strategy
Use deterministic synthetic fixtures for approximately 20 demo customers and simulated monthly history. Keep test fixtures separate from secrets and real personal financial data. Mock external services only if any are explicitly introduced.

## Test Data
- Synthetic customer profiles.
- Assets across mutual funds, equity, FDs, and gold.
- Manual and recurring expenses, including EMI, rent, and insurance.
- Simulated monthly history.
- Consent states for granted and revoked scenarios.

## Test Naming Conventions
Not yet established. Follow the selected test framework's conventions and the repository's existing patterns.

## Coverage Requirements
No numeric coverage threshold has been decided. Prioritize meaningful coverage of role authorization, consent, persistence, and key customer/consultant flows.

## Required Checks
To be finalized after repository inspection. Run the available checks relevant to a change, such as tests, lint, type checking, and production build, only if the project actually defines them.

## CI Testing
Not yet verified. Inspect CI configuration when a repository exists.

## Definition of Done
- The change satisfies the relevant `PRD.md` acceptance criteria.
- Role and consent boundaries are enforced at the trusted data-access layer.
- Relevant tests have been added or updated.
- Available required checks have been run and their actual results reported.
- UI changes follow the approved `DESIGN.md` reference and include appropriate loading, empty, and error states.
- Documentation is updated when behavior, architecture, or workflow changes.
- No secrets or real customer financial data are introduced.
