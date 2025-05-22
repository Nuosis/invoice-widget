# Development Tasks for `invoice-widget`

## 1. Widget Purpose
Display a table of QBO invoices filtered by `ItemRef.value` (2, 10, 38, 11), showing `CustomerRef.name` and last line `Amount`. On invoice click, expand to show line details (description, service date, quantity, unit price, extension). Include a global filter. Use modern Tailwind styling. Designed for FileMaker WebViewer integration.

## 2. Libraries and Frameworks to Install
- React (per tech stack selection)
- Tailwind CSS (for modern styling)
- FMGofer (for FileMaker integration)
- (Optional) Utility libraries as needed, with user consent

## 3. Styles to Implement
- Use Tailwind CSS for all UI components
- Ensure a clean, modern, and consistent look

## 4. State Management
- No external state management library (per setup)
- Use React's built-in state/hooks

## 5. Services to Create
- `service/FileMakerService.js`: Handles FileMaker script execution and data fetching

## 6. Components to Create
- `InvoiceTable`: Main table of invoices
- `InvoiceRow`: Row for each invoice, expandable to show lines
- `InvoiceLines`: Shows line details for a selected invoice
- `GlobalFilter`: UI for global filtering

## 7. Pages to Create
- Single-page widget (no routing required)

## 8. Other Relevant Information
- Trap for absence of FileMaker object and use sample data for browser testing
- Remove unused example files/folders before finalizing
- Follow constraints in the MCP prompt and `development_guidelines.md` (if present)