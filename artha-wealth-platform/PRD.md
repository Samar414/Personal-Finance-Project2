# Product Requirements Document

> Status: Initial baseline derived from project-planning discussions. Product scope below is the current intended MVP; validate any unresolved item before implementation. This document describes product behavior, not implementation.

## Product Overview
A web-based personal-finance platform with two connected experiences: a customer interface for tracking financial assets and expenses, and a consultant interface for viewing and helping manage customer financial information. The initial experience uses synthetic/demo customer data and simulated financial history.

## Target Users
- **Customers:** People who want a consolidated view of their assets and expenses.
- **Financial consultants:** Users who need to review customers' financial snapshots and help maintain their records.
- **Demo/evaluation users:** Hackathon reviewers exploring both role-based experiences.

## Problem Statement
Financial information can be scattered across asset types and expense categories. Customers need a clear overview, while consultants need an appropriately permissioned way to review customer information without unrestricted access.

## Goals
- Provide separate customer and consultant experiences.
- Show a consolidated asset and expense picture using synthetic/demo data.
- Support manual asset and expense management.
- Give consultants a customer directory and customer-level financial overview.
- Demonstrate explicit customer consent for consultant access to expense information.
- Persist changes so the demo remains coherent across sessions.
- Provide clear charts, tables, filters, and summary metrics where they improve understanding.

## Non-Goals (MVP)
- Live brokerage, trading, or transaction execution.
- Direct bank-account or financial-institution linking.
- Automated extraction from uploaded bank statements; statement uploads are deferred.
- Automated personalized investment recommendations or claims of guaranteed financial outcomes.
- Mutual-fund holdings beyond fund-level exposure; do not require underlying stock-level portfolio look-through.
- Production-grade financial advice, regulatory workflows, or real-money movement.

## Core Features

### MVP — Customer experience
- Registration and login for the customer role.
- Customer dashboard with financial summary and relevant visualizations.
- Asset/holdings view covering mutual funds, equity, fixed deposits (FDs), and gold.
- Add, view, edit, and remove supported asset records, subject to confirmation of the final interaction design.
- Expense view with manually entered expenses and categories.
- Support recurring expense records such as EMI, rent, and insurance.
- Show a simulated monthly history so charts and trends can be explored in the demo.
- Provide a clear consent action governing consultant access to expense information.

### MVP — Consultant experience
- Registration and login for the consultant role.
- Consultant dashboard with high-level customer summaries.
- Customer directory with search/filtering if represented in the approved mockups.
- Customer profile/financial overview for an individual customer.
- Shared asset-management capability as agreed in planning, with role permissions enforced.
- Expense details visible only when the relevant customer has explicitly consented.
- Approximately 20 synthetic customer profiles for the demonstration.

### MVP — Shared behavior
- Keep customer and consultant workflows distinct while using a consistent underlying set of customer records.
- Persist demo data and user changes.
- Clearly distinguish sample/simulated financial data from live financial data.
- Enforce role-based access and the expense-consent rule in the data-access layer, not only by hiding UI elements.

## User Flows

### Customer
1. Register or sign in as a customer.
2. View the customer dashboard.
3. Review assets and expense summaries.
4. Add or update asset and expense records.
5. Review recurring expenses and simulated monthly trends.
6. Grant or revoke consultant access to expense information.

### Consultant
1. Register or sign in as a consultant.
2. View the consultant dashboard.
3. Browse the customer directory.
4. Open a customer profile and review permitted financial information.
5. Manage permitted asset records.
6. See expense information only when consent is active.

## Future Features
- Financial goal planning.
- Statement upload and automated extraction.
- Bank/account integrations.
- More advanced analytics or planning tools, subject to product and compliance review.

## Technical Constraints
- The project is currently at the mockup stage; frontend implementation has not started.
- Final design direction is pending selection from the Awesome Design library.
- The precise implementation stack and deployment target must be confirmed before implementation; React + TypeScript + Vite and Supabase/PostgreSQL were previously discussed as a candidate, not a confirmed decision.
- Use synthetic data for the hackathon demo unless a later explicit decision changes this.
- No real financial account credentials or real customer financial data should be required for the MVP.

## Success Metrics
- A reviewer can complete the primary customer and consultant flows without assistance.
- Customer asset and expense changes persist after navigation and a new session.
- Consultant access to expense information is blocked unless the customer has granted consent.
- The demo contains approximately 20 synthetic customers with plausible simulated monthly history.
- Key dashboards communicate the asset and expense picture clearly and remain usable on supported screen sizes.

## Acceptance Criteria
- Both customer and consultant registration/login paths are represented and role-aware.
- Customer dashboard, assets, expenses, consultant dashboard, customer directory, and customer profile workflows are implemented according to approved mockups.
- Asset records support the agreed asset classes: mutual funds, equity, FD, and gold.
- Expense records support manual entry, categories, and recurring EMI/rent/insurance records.
- Synthetic monthly history is available for dashboard trends.
- Customer changes persist.
- Consultant expense access is denied by default and allowed only when the relevant consent is active; revocation removes access.
- UI clearly labels simulated/demo data.
- No live brokerage, bank linking, automated statement extraction, or automated investment advice is presented as an MVP capability.

## Open Questions
- Which Awesome Design reference will be selected?
- Which implementation stack and hosting target will be used?
- What exact fields and validation rules are required for each asset and expense type?
- Does shared asset management mean consultants may edit asset records for customers, or only assist through a customer-authorized workflow? Confirm before implementation.
- What is the intended registration/onboarding flow for consultants, and should consultant accounts require approval?
- What exact consent wording, scope, and audit history are required?
