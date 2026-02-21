# Recipe Finder

A full-featured meal planning web app built with React + Vite + Supabase. Search recipes, track your pantry, plan your week, and generate shopping lists — with dietary preferences applied automatically across everything.

**Live:** [recipe-finder-two-red.vercel.app](https://recipe-finder-two-red.vercel.app)

---

## Features

| Feature | Description |
|---------|-------------|
| **Recipe Search** | Search by dish, ingredient, or cuisine. Powered by TheMealDB. |
| **Dietary Preferences** | Set your profile once (vegan, kosher, halal, gluten-free, etc.) and every recipe view filters automatically |
| **Dietary Badges** | Recipe cards show matching dietary tags, with profile matches highlighted |
| **My Pantry** | Track ingredients you have at home — see which recipes you can make right now |
| **Saved Recipes** | Heart any recipe to save it to your collection |
| **Meal Planner** | Drag saved recipes into a weekly plan (breakfast, lunch, dinner, snacks) |
| **Shopping List** | Auto-generate a grouped shopping list from your meal plan |
| **Nutrition Dashboard** | Track nutritional intake across your planned meals |
| **Cooking History** | Log recipes you've cooked and track your streak |
| **Meal Suggestions** | AI-style suggestions based on your pantry and preferences |
| **Ingredients Explorer** | Browse and learn about ingredients |
| **Similar Recipes** | Every recipe drawer shows related recipes by category, cuisine, and dietary tags |
| **Recipe Sharing** | Share any recipe via native share sheet (mobile) or clipboard copy (desktop) |
| **Browse by Category** | Discover tab shows all TheMealDB categories with thumbnails — browse without typing |
| **Browse by Cuisine** | Filter recipes by cuisine area from the Discover tab |
| **Recipe of the Day** | Featured hero recipe on the Discover tab, refreshes daily, cached locally |
| **Data Manager** | Export and import all your data (recipes, plan, pantry, history) |
| **Auth & Sync** | Sign in with email or Google — data syncs across devices via Supabase |
| **Dark Mode** | Full dark mode support |
| **PWA-ready** | Installable on mobile |

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend:** Supabase (Postgres, Auth, Edge Functions)
- **Deployment:** Vercel
- **Recipe Data:** [TheMealDB](https://www.themealdb.com/)

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project (optional — app works offline with mock data)

### Setup

```bash
git clone https://github.com/bianakl/recipe-finder.git
cd recipe-finder
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

### Environment Variables

Create `.env.local` with the following:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app runs fully without Supabase — you just won't get cloud sync or auth. All features work locally with mock data.

---

## Project Structure

```
src/
├── components/       # All UI components
├── context/          # React context (Auth, Recipes, Theme)
├── hooks/            # Custom hooks (useSettings, usePremium, useRecipeSearch, …)
├── lib/              # Supabase client, Stripe client
├── services/
│   └── api.js        # Mock recipe data, filter logic, API calls
└── App.jsx           # Root component, tab routing
```

---

## Dietary Preferences System

Dietary preferences work in two layers:

1. **Profile layer** — set once in Settings, always applied. Shows as a banner in the filter bar and highlighted badges on recipe cards.
2. **Session layer** — temporary overrides via the filter bar for a single search session.

Both layers are merged before filtering results. Profile preferences are stored in localStorage and synced to Supabase when signed in.

Supported dietary tags: Vegetarian, Vegan, Pescatarian, Paleo, Keto, Halal, Kosher, Gluten-Free, Dairy-Free, Nut-Free, Shellfish-Free, Egg-Free, Low-Carb, High-Protein, Low-Calorie, High-Fiber, Low-Fat.

For live API results (TheMealDB), dietary tags are **inferred from ingredients** using keyword detection across 8 dietary categories, so filtering works correctly on real recipes too.

---

## Performance

- **Code splitting**: Heavy tabs lazy-load on first visit via React `lazy()` + `Suspense`
- **Initial JS bundle**: 429KB gzipped (down from 827KB — 48% reduction)
- **Vendor chunks**: React, Framer Motion, and Supabase split into separate cached chunks
- **Images**: Lazy-loaded throughout with `loading="lazy"`

---

## Development

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint check
```

### Claude Code Skills

This project has custom Claude Code skills in `.claude/skills/`:

| Skill | What it does |
|-------|-------------|
| `/deploy` | Lint → build → deploy to Vercel |
| `/security` | Full security audit (secrets, auth, RLS, headers, deps) |
| `/new-component` | Scaffold a new React component |
| `/add-recipe` | Add recipes to the mock data collection |
| `/debug-supabase` | Diagnose Supabase auth/database issues |
| `/seo` | Audit and improve SEO |

---

## Security

- All secrets via environment variables (`VITE_` prefix for client-safe keys only)
- Supabase anon key only — no service role key in client code
- Security headers via `vercel.json`: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Sign-out clears all Supabase session data from localStorage
- No `dangerouslySetInnerHTML` usage

---

## Built by

Biana Kleyner — built as a learning and portfolio project over ~3 weeks in early 2026.

**Built with Claude Code** — AI-assisted development for the full stack: components, API integration, security audit, performance optimization, and deployment.
