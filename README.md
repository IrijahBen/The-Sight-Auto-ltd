# 🚗 Elsonny Automotive

Premium React car showroom with real car images via [IMAGIN.studio](https://imagin.studio) CDN.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Structure

```
elsonny/
├── index.html                     # Vite entry HTML
├── vite.config.js                 # Vite configuration
├── package.json
└── src/
    ├── main.jsx                   # React DOM entry point
    ├── App.jsx                    # Root component — owns all shared state
    │
    ├── data/
    │   └── index.js               # All static data: brands, cars, offers, branches, etc.
    │
    ├── utils/
    │   └── index.js               # getCarImageUrl(), ls (localStorage), formatPrice()
    │
    ├── hooks/
    │   └── index.js               # useLocalStorage, useNotify, useCountdown, useTheme
    │
    ├── styles/
    │   └── globals.css            # CSS variables, keyframes, utility classes, reset
    │
    ├── components/
    │   ├── CarImage.jsx           # Lazy car image with spinner + fallback
    │   ├── CarCard.jsx            # Car grid card (image, specs, cart, favorite)
    │   ├── BrandSwiper.jsx        # Brand tab + auto-advancing swiper
    │   ├── OfferCard.jsx          # Offer card with countdown timer
    │   ├── Stars.jsx              # Star rating (static or interactive)
    │   ├── Navbar.jsx             # Responsive navbar with hamburger menu
    │   ├── CartDrawer.jsx         # Slide-in cart panel
    │   ├── ToastContainer.jsx     # Toast notification renderer
    │   └── Footer.jsx             # Site footer
    │
    └── pages/
        ├── HomePage.jsx           # Hero, stats, brand swiper, offers strip
        ├── CarsPage.jsx           # Full catalogue with search + filter
        ├── CarDetailPage.jsx      # Car detail: gallery, color picker, reviews
        ├── SupportPages.jsx       # OffersPage, ConfigurePage, BranchesPage, EventsPage, GalleryPage
        └── ContentPages.jsx       # NewsPage, FaqPage, FavoritesPage, ProfilePage, AuthPage
```

---

## 🖼️ Car Image API — IMAGIN.studio

All car images are fetched live from [imagin.studio](https://imagin.studio/):

```
https://cdn.imagin.studio/getimage
  ?customer=img          ← public demo key (no sign-up needed)
  &make=mercedes-benz
  &modelFamily=c-class
  &modelYear=2024
  &zoomType=fullscreen
  &angle=23              ← 23=front, 01=side, 29=3/4, 13=rear, 07=top
  &paintDescription=obsidian-black
```

**Color picker changes the image live** — selecting a new paint on the detail/builder page re-fetches instantly with the correct paint code.

To use your own API key, replace `"img"` with your customer ID in `src/utils/index.js`:
```js
customer: "your-customer-id",
```

---

## 🎨 Theming

The app uses CSS custom properties on `<body data-theme="dark|light">`:

| Variable      | Dark          | Light        |
|--------------|--------------|--------------|
| `--bg`       | `#08080F`    | `#F8F5F0`    |
| `--surface`  | `#10101C`    | `#FFFFFF`    |
| `--text`     | `#EDE8E0`    | `#1A1510`    |
| `--gold`     | `#C0A060`    | `#C0A060`    |
| `--border`   | `#222236`    | `#DDD8CE`    |

Toggle with the ☀/🌙 button in the navbar.

---

## ✅ Features

| Feature | Details |
|---|---|
| 🖼️ Real Car Images | IMAGIN.studio CDN — correct brand/model/year/color/angle |
| 🎨 Live Color Picker | Changes image in real-time across detail + builder |
| 🔄 Brand Swiper | Auto-advance, prev/next, responsive 1–4 columns |
| 🛒 Cart | Add/remove, persistent, nearest branch auto-detection |
| ♥ Wishlist | Toggle favorites, persisted via localStorage |
| 🔍 Search | Autocomplete suggestions, brand filter, load-more |
| ⭐ Reviews | Per-car star rating + comment, user-attributed |
| ⚙️ Car Builder | Live preview with brand/model/color/wheels/interior/add-ons |
| 🌙 Dark/Light | Full theme toggle via CSS variables |
| 📱 Responsive | Mobile-first, hamburger menu, 1-column on small screens |
| 🔔 Toasts | Animated notification system |
| 🔐 Auth | Register/Login with localStorage (ready for backend swap) |
| 📍 Branches | Nearest showroom auto-detected from user's governorate |

---

## 🔌 Connecting a Real Backend

All state uses `useLocalStorage` hooks. To swap to a real backend:

1. Replace `ls.get/set` calls in `src/hooks/index.js` with API calls
2. Auth: replace localStorage user store with JWT / session
3. Cart: POST to `/api/cart`, GET on mount
4. Comments: POST to `/api/reviews/:carId`
5. The component layer stays unchanged — only the hooks need updating

---

## 📦 Dependencies

- **React 18** — UI framework
- **Vite 5** — dev server + bundler
- Zero extra runtime dependencies (no Swiper.js, no Framer Motion)
- Fonts: Cormorant Garamond + DM Sans via Google Fonts
