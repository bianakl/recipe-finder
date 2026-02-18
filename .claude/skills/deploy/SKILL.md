---
name: deploy
description: Build and deploy the recipe-finder app to Vercel and optionally sync Supabase edge functions
argument-hint: "[all | frontend | functions]"
---

Build and deploy the recipe-finder app.

## Instructions

1. First, run `npm run lint` to check for errors. Fix any issues before proceeding.
2. Run `npm run build` to create a production build. Fix any build errors.
3. Based on `$ARGUMENTS`:

### Frontend only (default, or `frontend`)
- Run `vercel --prod` to deploy to Vercel
- Report the deployment URL

### Supabase functions only (`functions`)
- Run `supabase functions deploy` to deploy all edge functions in `supabase/functions/`
- Confirm each function deployed successfully

### Everything (`all`)
- Deploy Supabase edge functions first
- Then deploy frontend to Vercel
- Report all deployment URLs

4. After deployment, verify the production URL is accessible.
5. Report the deployment status and any warnings.
