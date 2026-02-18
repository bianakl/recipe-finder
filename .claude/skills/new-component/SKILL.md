---
name: new-component
description: Scaffold a new React component following recipe-finder project conventions
argument-hint: "[ComponentName]"
---

Create a new React component following this project's conventions.

## Project Conventions

- Components live in `src/components/`
- Files use **PascalCase**: `ComponentName.jsx`
- Components are **named exports**: `export function ComponentName()`
- Use **functional components** with hooks
- Styling: **Tailwind CSS v4** utility classes (no CSS modules or styled-components)
- Animations: **Framer Motion** (`motion` from `framer-motion`) when appropriate
- State: Use React hooks (`useState`, `useEffect`, etc.)
- Context: Import from `src/context/` (RecipeContext, AuthContext, ThemeContext) as needed
- Custom hooks live in `src/hooks/`

## Instructions

1. Create `src/components/$ARGUMENTS.jsx` with:
   - Named export function
   - Tailwind classes for styling
   - Dark mode support using `dark:` Tailwind variants
   - Responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
   - Framer Motion entry animation if it's a visible UI component
   - Props destructured in the function signature
   - Import relevant context/hooks if the component needs app state

2. If the component needs a custom hook, create it in `src/hooks/`
3. Show where to import/use the component in the app (e.g., `App.jsx`)
4. Do NOT create test files, CSS files, or index barrel files
