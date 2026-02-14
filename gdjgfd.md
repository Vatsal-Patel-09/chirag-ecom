# MYOTEES UI Overhaul Plan

## Goal
Redesign the entire UI to match The Souled Store's layout structure with a **hand-drawn/cartoon/sketch aesthetic** theme. Rename brand to **MYOTEES**, switch currency to **INR**. Keep all backend (auth, APIs, DB, middleware, cart store) identical.

## Design System

### Fonts (via `next/font/google`)
- **Permanent Marker** — brand name, section headings, page titles
- **Caveat** — badges, labels, decorative text, subheadings
- **System UI** — body text, forms (readability)

### Color Palette (warm, playful)
| Token | Role | Hex |
|-------|------|-----|
| `primary-*` | Warm coral/red (CTAs, accents) | `#e85d45` base |
| `secondary-*` | Mustard/golden (highlights, badges) | `#fbbf24` base |
| `accent-*` | Teal (links, success states) | `#14b8a6` base |
| `warm-*` | Warm neutrals (replaces gray-*) | beige-toned grays |

### Hand-Drawn CSS Effects (pure CSS, no libraries)
- **`sketchy-border`** — irregular border-radius (`255px 15px 225px 15px / 15px 225px 15px 255px`)
- **`sketch-shadow`** — offset solid shadows (`2px 2px 0 dark, 4px 4px 0 light`)
- **`hand-underline`** — SVG squiggly underline via `background-image`
- **`hand-circle`** — SVG hand-drawn circle around prices
- **`cartoon-badge`** — Caveat font, irregular radius, slight rotation
- **`tilt-1/2/3`** — subtle rotations (-1deg to 1.5deg) for organic feel
- **`paper-bg`** / **`kraft-bg`** — lined/textured backgrounds via CSS gradients
- **`wavy-top/bottom`** — zigzag section dividers via `clip-path`
- **`brand-name`** — Permanent Marker font class

---

## Implementation Order (32 files)

### Phase 0: Foundation (3 files)

1. **`src/app/globals.css`** — Replace purple/blue/gray palette with primary/secondary/accent/warm tokens. Add all hand-drawn CSS utility classes listed above. Change body background to warm-50.

2. **`src/app/layout.tsx`** — Import Permanent Marker + Caveat via `next/font/google`, attach as CSS variables. Update metadata: title to "MYOTEES", description to reference MYOTEES + INR.

3. **`src/lib/utils.ts`** — Change `formatPrice()` from `en-US`/`USD` to `en-IN`/`INR` with 0 decimal places.

### Phase 1: Shared Layout (2 files)

4. **`src/components/layout/Navbar.tsx`**
   - Dark warm navbar (`bg-warm-900`) like Souled Store
   - Logo: "MYOTEES" in Permanent Marker font, cream color
   - Horizontal category links visible on desktop (Men, Women, Unisex, Kids, Sports, Premium)
   - Persistent search bar in center (sketchy-border-light)
   - Right icons: User dropdown, Wishlist heart, Cart bag — cream colored, coral badge
   - Mobile: Slide-in from left (full-height dark overlay), brand name at top, category list
   - Update: phone to +91 format, email to hello@myotees.in, shipping to "Rs.999"
   - Replace all purple-* with primary-*

5. **`src/components/layout/Footer.tsx`**
   - Dark warm footer with wavy-top edge
   - "MYOTEES" brand in Permanent Marker, playful tagline in Caveat
   - Column headings in Caveat with hand-underline-yellow
   - Social media icon row with sketchy borders
   - Indian address/phone/email
   - Copyright "MYOTEES", payment methods text (UPI, Cards, COD)

### Phase 2: Homepage (8 files)

6. **`src/components/home/Hero.tsx`** — Headings in Permanent Marker, CTA buttons with sketchy-border + sketch-shadow, warm overlay, sketchy dot indicators

7. **`src/components/home/TrustBar.tsx`** — kraft-bg texture, icons in sketchy-border-sm containers, Caveat for feature titles, alternating tilts, Rs.999

8. **`src/components/home/CategoryShowcase.tsx`** — Section heading in Permanent Marker with hand-underline, tiles with sketchy-border, category names as cartoon-badges, alternating tilts

9. **`src/components/home/FeaturedProducts.tsx`** — Section heading styled, product images with sketchy-border-light, Sale badges as cartoon-badges, price with hand-circle emphasis, CTA with sketchy-border

10. **`src/components/home/PromoBanner.tsx`** — Sketchy borders + shadows on banners, Caveat accent text, Permanent Marker headings

11. **`src/components/home/BlogPreview.tsx`** — paper-bg section, sketchy-border-light cards with alternating tilts, Caveat dates

12. **`src/components/home/InstagramFeed.tsx`** — Update to @myotees, sketchy-border-sm on images, warm hover overlay

13. **`src/app/page.tsx`** (homepage root) — No structural changes needed, component updates cascade

### Phase 3: Product Pages (5 files)

14. **`src/components/product/ProductFilters.tsx`** — Caveat headings, sketchy-border active states, warm panel colors, mobile overlay dark warm

15. **`src/components/product/ProductGallery.tsx`** — Main image in sketchy-border + sketch-shadow, thumbnails with sketchy-border-sm, primary-600 active border

16. **`src/components/product/AddToCartButton.tsx`** — Sketchy-border size selectors, quantity controls, CTA with sketchy-border + sketch-shadow-primary in primary-600

17. **`src/app/(shop)/products/page.tsx`** — Hand-drawn breadcrumbs, cartoon-badge labels, sketchy pagination buttons, all purple->primary

18. **`src/app/(shop)/products/[slug]/page.tsx`** — Permanent Marker product name, hand-circle price, cartoon-badge bestseller/discount tags, sketchy trust badges

### Phase 4: Cart & Checkout (3 files)

19. **`src/app/(shop)/cart/page.tsx`** — Permanent Marker title, sketchy-border item cards, warm summary sidebar, primary-600 CTA

20. **`src/app/(shop)/checkout/page.tsx`** — Sketchy step indicators, sketchy-border form inputs, default country "IN", Indian placeholders, primary CTA

21. **`src/app/(shop)/checkout/success/page.tsx`** — Playful heading ("Woohoo!") in Permanent Marker, decorative doodles, sketchy CTA buttons

### Phase 5: Account & Orders (5 files)

22. **`src/app/(shop)/account/page.tsx`** — Permanent Marker title, sketchy profile card, primary-colored stat cards, cartoon-badge status tags

23. **`src/app/(shop)/account/addresses/page.tsx`** — Sketchy form inputs, cartoon-badge "Default" label, country default "IN"

24. **`src/app/(shop)/wishlist/page.tsx`** — Sketchy product cards, primary CTA buttons, playful empty state

25. **`src/app/(shop)/orders/page.tsx`** — Sketchy order cards, cartoon-badge statuses, playful empty state

26. **`src/app/(shop)/orders/[id]/page.tsx`** — Sketchy timeline, address/summary cards styled warm

### Phase 6: Utility Pages (2 files)

27. **`src/app/(shop)/contact/page.tsx`** — Sketchy form, warm info cards, Indian contact details

28. **`src/app/(shop)/faq/page.tsx`** — Sketchy accordion items, warm banner, update prices/shipping to INR/India

### Phase 7: Auth Pages (3 files)

29. **`src/app/(auth)/layout.tsx`** — "MYOTEES" overlay text in Permanent Marker, warm backdrop, paper-bg right panel

30. **`src/app/(auth)/login/page.tsx`** — Permanent Marker heading, sketchy form inputs, primary CTA

31. **`src/app/(auth)/register/page.tsx`** — Same treatment as login

### Phase 8: Admin (minimal — 2 files)

32. **`src/app/admin/layout.tsx`** — Brand text "MYOTEES" only
33. **`src/app/admin/page.tsx`** — purple->primary color swaps, currency handled by formatPrice

### Phase 9: Global Sweep

- Grep & replace remaining: "TeeStore" -> "MYOTEES", "@tshirtstore" -> "@myotees", "tshirtstore.com" -> "myotees.in"
- All remaining `purple-*` -> `primary-*` across shop pages
- All `gray-*` -> `warm-*` in shop components (not admin)
- US references to Indian equivalents

---

## Files NOT Modified (backend preserved)
- `src/lib/db/*`, `src/lib/auth.ts`, `src/lib/auth-types.ts`
- `src/middleware.ts`
- `src/app/api/**/*`
- `src/store/cart-store.ts`
- `src/lib/validators.ts`
- `src/components/providers/*`
- `src/types/*`
- Admin product/order/category page bodies (only layout + dashboard get brand updates)

## Responsive Design
- Mobile (<640px): Single column, slide-in hamburger menu, stacked cart/checkout
- Tablet (640-1024px): 2-col grids, visible search bar
- Desktop (1024px+): Full horizontal nav, sidebars, 3-4 col grids
- Permanent Marker font sizes scale down properly at each breakpoint
- Tilted elements don't overflow on small screens

## Verification
1. Run `npm run dev` and check all pages load without errors
2. Test homepage: Hero carousel, all sections render with new theme
3. Test navbar: Desktop links, search, dropdowns, mobile hamburger slide-in
4. Test product listing: Filters, pagination, cards styled correctly
5. Test product detail: Gallery, add to cart, size selection
6. Test cart -> checkout -> success flow end-to-end
7. Test login/register pages
8. Test at 375px, 768px, 1024px, 1440px widths
9. Verify all prices show in INR (Rs.) format
10. Verify "MYOTEES" appears everywhere (no "TeeStore" remnants)
11. Run `npm run build` to catch any build errors
