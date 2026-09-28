# Menu Routing Refactor Plan

## Goal
Restructure the public restaurant menu routes so the root `/` renders the restaurant menu, category detail lives under `/categories/[slug]`, and the multi-restaurant tree at `/restaurants/[id]/...` is preserved — all without duplicating UI or category data, and without exposing the internal restaurant ID in public root navigation.

## Current State
- `app/page.tsx` is a stub with a link to `./restaurants/1/`.
- `app/restaurants/[id]/page.tsx` renders Hero + RestaurantInfo + CategoryGrid (the real restaurant-home UI).
- `app/restaurants/partials/` holds `Hero.tsx`, `RestaurantInfo.tsx`, `CategoryGrid.tsx`, `Banner.tsx`.
- `app/restaurants/[id]/categories/page.tsx` shows a back-link + `CategoryGrid`.
- `app/restaurants/[id]/categories/[slug]/page.tsx` shows a category detail card, with a hardcoded `CATEGORY_LABELS` map and a user-visible `Restaurant {id}` line.
- No `app/categories/` tree exists yet.
- `DEFAULT_CATEGORIES` lives only in `CategoryGrid.tsx`; `CATEGORY_LABELS` lives only in the slug page.

## Target State
```
app/page.tsx                         -> renders RestaurantHome (default restaurant)
app/categories/[slug]/page.tsx       -> public category detail
app/restaurants/[id]/page.tsx        -> renders RestaurantHome (multi-restaurant)
app/restaurants/[id]/categories/page.tsx            -> back-link + CategoryGrid (multi-restaurant)
app/restaurants/[id]/categories/[slug]/page.tsx     -> category detail (multi-restaurant)
```

## Changes

### 1. Shared data + components (single source of truth)
Create `components/restaurant/` (already exists as empty dir):
- `components/restaurant/RestaurantHome.tsx` — composes Hero + RestaurantInfo + CategoryGrid. Accepts optional `restaurantId` prop; defaults to `DEFAULT_RESTAURANT_ID`. Both `app/page.tsx` and `app/restaurants/[id]/page.tsx` consume this component.
- `components/restaurant/categories.ts` — exports `DEFAULT_CATEGORIES` (move out of `CategoryGrid.tsx`) and `CATEGORY_LABELS` (move out of slug page). This is the single place category data lives.
- `components/restaurant/RestaurantInfo.tsx`, `components/restaurant/Hero.tsx` — move existing partials here (or re-export) so both route trees import from one location. Keep `app/restaurants/partials/` as thin re-exports to avoid breaking existing relative imports, OR update imports to the new location. Prefer updating imports to the new location and deleting the old partials to avoid duplication.

### 2. CategoryGrid link behavior
`CategoryGrid` gains a `base` prop (or `useMultiRestaurant` boolean):
- Public root flow: links to `/categories/${slug}`.
- Multi-restaurant flow: links to `/restaurants/${restaurantId}/categories/${slug}`.
The `restaurantId` prop is still required for the multi-restaurant tree but is never rendered to the user in the root flow.

### 3. New public category route
Create `app/categories/[slug]/page.tsx` — renders the same category detail UI as the multi-restaurant slug page, using shared `CATEGORY_LABELS`. No restaurant ID shown.

### 4. Multi-restaurant slug page
Update `app/restaurants/[id]/categories/[slug]/page.tsx` to:
- Import shared category data.
- Remove the user-visible `Restaurant {id}` line (keep ID internal only).

### 5. Root page
`app/page.tsx` renders `<RestaurantHome />` (no redirect, no link to `/restaurants/1`).

### 6. DEFAULT_RESTAURANT_ID
Define once in `components/restaurant/constants.ts` (or `lib/restaurant.ts`) as `DEFAULT_RESTAURANT_ID = "1"`. Import everywhere needed. No other file hardcodes `"1"`.

### 7. Remove dead files
- Delete `app/restaurants/page.tsx` (list placeholder) if unused after refactor, or keep as-is if it serves a purpose — verify it is not needed. Prefer keeping `/restaurants` list minimal or removing if it duplicates. Decision: keep `app/restaurants/page.tsx` as a simple index only if needed; otherwise remove. (Default: remove to avoid confusion, since `/restaurants/[id]` is the canonical multi-restaurant page.)

## Verification
- `npm run build` must succeed.
- Manual/mental route check:
  - `/` → Hero + info + grid → grid links to `/categories/[slug]`.
  - `/categories/[slug]` → detail, no ID visible.
  - `/restaurants/[id]` → same RestaurantHome UI.
  - `/restaurants/[id]/categories` → grid links to `/restaurants/[id]/categories/[slug]`.
  - `/restaurants/[id]/categories/[slug]` → detail, no user-visible ID.

## Out of scope
- Real data fetching (mock data stays).
- Adding new shadcn components.
- Changing the Nova preset or global styles.