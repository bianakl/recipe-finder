---
name: seo
description: Audit and improve SEO for the recipe-finder app
argument-hint: "[audit | fix | meta | structured-data]"
---

Audit and improve SEO for the recipe-finder app (a Vite + React SPA).

## Instructions

Based on `$ARGUMENTS`:

### Full audit (`audit` or no argument)
1. Check `index.html` for:
   - Title tag, meta description, viewport, charset
   - Open Graph tags (og:title, og:description, og:image, og:url)
   - Twitter Card tags
   - Canonical URL
   - Favicon and apple-touch-icon
   - Language attribute on `<html>`
2. Check for structured data (JSON-LD) for Recipe schema
3. Check if `robots.txt` and `sitemap.xml` exist in `public/`
4. Check image alt texts in components
5. Check semantic HTML usage (header, main, nav, article, section)
6. Check heading hierarchy (h1-h6)
7. Report all findings with severity (critical, warning, info)

### Fix issues (`fix`)
- Run the audit first, then fix all critical and warning issues
- Update `index.html` with proper meta tags
- Add `public/robots.txt` if missing
- Improve semantic HTML in components where needed

### Meta tags only (`meta`)
- Add/update meta tags in `index.html`:
  - Title: descriptive, under 60 chars
  - Meta description: compelling, under 160 chars
  - Open Graph tags for social sharing
  - Twitter Card tags

### Structured data (`structured-data`)
- Add JSON-LD Recipe schema markup
- Follow Google's structured data guidelines for recipes
- Include: name, image, author, datePublished, description, prepTime, cookTime, ingredients, instructions, nutrition

## SPA Considerations
- This is a client-side rendered React app on Vercel
- For full SSR/prerendering SEO, note limitations but optimize what's possible
- Focus on `index.html` meta tags, semantic HTML, and structured data
