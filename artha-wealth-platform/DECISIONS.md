# Decision Log

> Record decisions once they are explicitly made. Do not rewrite history; supersede changed decisions with a new entry.

## Use of Synthetic Demo Data

### Date
2026-10-18

### Status
Current project constraint

### Context
The application is being built for a hackathon demonstration, with approximately 20 example customer profiles.

### Options Considered
- Use synthetic/demo financial data.
- Use real customer financial data.

### Decision
Use synthetic/demo data for the MVP.

### Reasoning
The product can demonstrate customer and consultant workflows without requiring real financial information.

### Trade-offs
Synthetic records are suitable for demonstrating workflows and visualizations but do not validate real-world financial-data integrations.

### Consequences
Clearly label simulated information and avoid requiring real financial account credentials.

### Alternatives Rejected
Using real customer financial data for the demo.

---

## Explicit Consent for Consultant Expense Access

### Date
2026-10-18

### Status
Current product requirement

### Context
Consultants need to review customer information, but expense data requires an explicit customer permission boundary.

### Options Considered
- Permit consultant expense access by default.
- Require customer consent.

### Decision
Require explicit customer consent before a consultant can access that customer's expense information.

### Reasoning
The product must make this privacy boundary meaningful rather than relying on interface visibility alone.

### Trade-offs
Consent adds a workflow and authorization checks.

### Consequences
The selected backend/data store must enforce the rule on relevant reads; revocation must prevent subsequent access. Add tests for this behavior.

### Alternatives Rejected
Default consultant access without explicit consent.

---

## Candidate Implementation Stack

### Date
2026-10-18

### Status
Proposed — not approved

### Context
An initial stack was discussed during planning, but frontend implementation has not started.

### Options Considered
- React + TypeScript + Vite, Supabase/PostgreSQL, and Recharts as a candidate.
- Other stacks, not yet evaluated in this document.

### Decision
No final stack decision has been made. The candidate above must not be treated as approved.

### Reasoning
The repository and final implementation constraints have not yet been inspected or confirmed.

### Trade-offs
Deferring the decision avoids documenting a false commitment, but implementation must wait until the stack is selected.

### Consequences
Once selected, create a new approved decision entry and update `ARCHITECTURE.md`, `AGENTS.md`, and `TESTING.md` as appropriate.

### Alternatives Rejected
None. No stack has been rejected.

---

## Visual Design Reference

### Date
2026-10-18

### Status
Pending

### Context
Mockup designs exist, and the user plans to choose a reference from the Awesome Design library.

### Options Considered
Not yet evaluated.

### Decision
Do not finalize design tokens until the reference is selected.

### Reasoning
The design system should reflect the chosen reference rather than invented values.

### Trade-offs
Detailed UI implementation should wait for this decision; information architecture and product requirements can still be prepared.

### Consequences
Update `DESIGN.md` after the reference is selected and record any deliberate deviations.

### Alternatives Rejected
Prematurely committing to a visual style without the chosen reference.
