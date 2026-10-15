# Gemstone store (Next.js 14)

## Change things in one place
- **Brand name, tagline, SEO text, currency, the 9 gems:** `config/site.js`
- **Theme colors:** 4 values in `app/globals.css` (`--ink --panel --gold --pearl`)

## Run
1. `npm install`
2. Copy `.env.example` to `.env.local`, fill it in
3. `npm run seed` (4 test products), then `npm run dev`

## Admin
- Login page: **/admin/login** (no link on the site). Use `ADMIN_EMAIL` + `ADMIN_PASSWORD` from `.env.local`, or Google with the same email.
- `/admin`: charts, latest inquiries (name, phone, qty). `/admin/products/new`: list a product (image goes to Cloudinary).
- Tick "Show on landing page" to feature a product (landing shows 8 in two rows; falls back to latest).

## Features
Landing (9 gems, featured products) · products (debounced text search, gem filter chips) · product page (certificate, reviews, related, inquiry form saved in MongoDB) · SEO (metadata, JSON-LD, sitemap, robots) · mobile-first layout.

## Performance
Server Components, ISR caching, `next/image` (AVIF/WebP, lazy), indexed + lean queries, chart code only on admin, pure-CSS mobile menu (no JS).

## Not built yet
Blog, About journey page, review submission.

## v4 changes
- **Theme** matches your design: warm brown, beige, gold, green hero, Playfair Display SC + Lora fonts (`app/globals.css`, `app/layout.js`).
- **Landing**: hero, 9 gems, "Our Collection" (circular cards), "Commission a Piece" form (saved as a general inquiry).
- **Errors**: custom 404 (`app/not-found.js`), error pages (`app/error.js`, `app/global-error.js`), API handlers wrapped so failures return JSON 500, bad `?type=` gives 404, DB reconnects after a failure.
- **Admin**: `/admin/products` (all products + search), `/admin/inquiries` (filter by status New/Reviewing/Contacted/Closed, search, change status). Statuses are in `config/site.js`.

## v5 changes
- **Our Collection** is a sliding carousel (swipe on mobile, arrows on desktop). Card opens the product; "View all" opens `/products`.
- **Two prices**: Offer price (`price`) and Original price (`mrp`, shown crossed out). Leave original empty for no offer.
- **Admin edit**: `/admin/products` → click a name or Edit. Same form as "List product" (`components/ProductForm.js`).
- **Certificate fields** follow your testing report (ref no, date, colour, cut, dimension, hardness, R. index, clarity, conclusion, comments, certificate image). Edit the list in `config/site.js` (`CERT_FIELDS`).
- **Inquiry**: ratti and carat are mandatory (prefilled on product pages, editable). The product name/type/price is saved with each inquiry and shown in the admin list.
- Existing products: open each in admin → add original price, ratti and certificate details. Re-run `npm run seed` to refresh the 4 test products with these fields.

## v6 changes
- **Light theme** by default. Options in `config/theme.js`: `ivory`, `sage` (light green), `dark`. Switch with `THEME` there or `NEXT_PUBLIC_THEME` in `.env.local`. Edit the RGB values to make your own.
- **Brand name**: one place, `config/site.js` (`SITE.name`), or set `NEXT_PUBLIC_BRAND_NAME` in `.env.local`. It feeds the header, footer, page titles, admin login.
- **Extra fields when listing a product**: "Extra details" rows (add / remove) in the admin form; shown on the product page. Certificate fields left empty are hidden. Edit the certificate list in `config/site.js`.

## v7 changes
- **Inquiry form**: stone dropdown (all gems) + carat are required; ratti removed. On a product page the stone, carat and product are filled automatically and saved with the inquiry.
- **Admin sorting**: click any column header in `/admin/products` and `/admin/inquiries` (asc, then desc). Search/filter is kept.
- **Seed**: `npm run seed` adds 4 dummy products for each of the 9 gems (36). It first removes older dummy (picsum) products; real products are untouched.
