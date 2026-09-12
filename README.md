# 🏺 Kaarigar (कारीगर) — Slow-Crafted Artisan Marketplace

Kaarigar is a hyper-local, artisan-focused handmade products marketplace built with a warm terracotta aesthetic inspired by `mytopicals.com` — featuring bold color blocks, oversized confident typography, 3D interactive craft models, and playful microcopy.

The architecture is divided into clean, decoupled **`frontend/`** and **`backend/`** directories so the universal REST API powers both the **Web Application** and **Mobile Apps** (React Native, Flutter, Expo, iOS/Android).

---

## 📁 Repository Structure

```
Kaarigar/
├── frontend/                     # React.js + Tailwind CSS + Three.js Web Application
│   ├── src/
│   │   ├── api/client.js         # Configurable API client with offline fallback
│   │   ├── components/
│   │   │   ├── hero/             # 3D Pottery Vase with React Three Fiber
│   │   │   ├── products/         # ProductCard, FilterSidebar, ImageZoomGallery
│   │   │   ├── artisans/         # FeaturedArtisans, ArtisanStoryReels
│   │   │   ├── cart/             # Slide-in CartDrawer with shipping milestones
│   │   │   ├── common/           # Infinite Marquee ticker
│   │   │   └── modals/           # Live SearchModal & SellerModal
│   │   ├── context/              # CartContext & WishlistContext
│   │   ├── pages/                # Landing, Products, Detail, Checkout, Order Success, Wishlist, Artisan Profile
│   │   └── index.css             # Earthy design system tokens & brutalist shadows
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                      # Universal REST API (Web + Mobile App Ready)
│   ├── server.js                 # Express server with open CORS & morgan logging
│   ├── routes/
│   │   ├── products.js           # Filtering, price search, category, regional origin
│   │   ├── artisans.js           # Master artisan profiles & cluster collections
│   │   ├── orders.js             # Order placement, pricing, tracking timeline
│   │   ├── stories.js            # Video craft reels
│   │   ├── testimonials.js       # Customer and interior architect reviews
│   │   ├── categories.js         # Categories with dynamic counts
│   │   └── sellers.js            # Artisan onboarding application intake
│   └── data/                     # Seed craft datasets
│
└── README.md
```

---

## 🚀 Quick Start

### 1. Start the Universal Backend API (Port 5000)

```bash
cd backend
npm install
npm run dev # or: npm start
```

API will run on:
- Web: `http://localhost:5000/api`
- Android Emulator: `http://10.0.2.2:5000/api`
- Health check: `http://localhost:5000/api/health`

### 2. Start the React.js Web Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

Web app will open at: `http://localhost:5173`

---

## 📱 Mobile App (React Native / Flutter / Expo) Integration

The backend is pre-configured with open CORS and JSON envelopes:
```json
{
  "success": true,
  "data": [ ... ]
}
```

### Available Endpoints for Mobile Apps:
- **Products Listing**: `GET /api/products?category=...&minPrice=...&maxPrice=...&location=...&search=...&sort=...`
- **Product Detail**: `GET /api/products/:idOrSlug`
- **Master Artisans**: `GET /api/artisans` / `GET /api/artisans/:id`
- **Create Order**: `POST /api/orders`
- **Order Tracking**: `GET /api/orders/:orderId`
- **Craft Stories & Reels**: `GET /api/stories`
- **Maker Onboarding**: `POST /api/sellers/apply`

---

## 🎨 Brand Palette
- **Primary Accent**: Terracotta Clay (`#D95D39`)
- **Secondary CTA**: Forest Green (`#225541`)
- **Badges & Highlights**: Warm Mustard Saffron (`#E8A428`)
- **Background**: Earthy Cream Canvas (`#FAF8F3`)
- **Typography**: Fraunces (Variable Display Serif) + Plus Jakarta Sans