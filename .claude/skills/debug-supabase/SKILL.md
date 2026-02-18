---
name: debug-supabase
description: Diagnose Supabase auth, database, or edge function issues in the recipe-finder app
argument-hint: "[auth | db | functions | sync]"
---

Diagnose and fix Supabase-related issues in the recipe-finder app.

## Instructions

1. Read `src/lib/supabase.js` to check the client configuration
2. Based on `$ARGUMENTS`, investigate:

### Auth issues (`auth`)
- Check `src/context/AuthContext.jsx` for auth flow
- Check `src/components/AuthModal.jsx` for sign-in/sign-up UI
- Verify `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check for common issues: expired tokens, incorrect redirect URLs, RLS policies

### Database issues (`db`)
- Check `src/lib/syncTransformers.js` for data sync logic
- Review how data is read/written to Supabase tables
- Look for RLS policy issues, missing tables, or schema mismatches

### Edge function issues (`functions`)
- Read the functions in `supabase/functions/` (stripe-webhook, stripe-checkout, create-portal-session, delete-account)
- Check for missing environment variables (Stripe keys, etc.)
- Run `supabase functions serve` to test locally if possible

### Sync issues (`sync`)
- Check `src/hooks/useCloudSync.js` for sync logic
- Look at `src/lib/syncTransformers.js` for data transformation
- Verify offline/online mode transitions

3. Report findings with specific file locations and line numbers
4. Suggest fixes with code changes if issues are found
