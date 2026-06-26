# Storefront Platform

A modern React-based storefront platform designed for multi-seller ecommerce ecosystems.

This project is part of a scalable ecommerce architecture where multiple seller storefronts connect to a centralized platform through a shared API.

## Overview

The goal of this project is to provide highly customizable storefronts for individual sellers while maintaining a unified backend for:

* Products
* Orders
* Payments
* Inventory
* Customer accounts

Each storefront can have its own branding, theme, products, and content while using the same core platform.

## Features

* Mobile-first design
* Seller-specific storefronts
* Product feed experience inspired by TikTok Shop and Instagram Shop
* Product details pages
* Shopping cart
* Checkout flow
* Theme customization
* API-driven architecture
* Reusable React components
* Future React Native support

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Axios
* Tailwind CSS (planned)

### Backend (Future)

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JWT Authentication

## Backend MVP

The project now includes a small Node.js backend for checkout orders.

### Endpoints

* `GET /api/health` - backend health check
* `POST /api/orders` - create checkout order
* `GET /api/orders` - admin order list, available only when `ADMIN_TOKEN` is set and the request includes `X-Admin-Token`

### Local Development

Run the API in one terminal:

```bash
npm run dev:api
```

Run the Vite frontend in another terminal:

```bash
npm run dev
```

Vite proxies `/api` requests to `http://127.0.0.1:3000`.

### Production Build

Build frontend and backend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

The production server serves both `dist/` and `/api/*` from one Node process.

### Environment

Copy `.env.example` to `.env` for local settings, or set the same variables in your hosting dashboard:

* `PORT` - server port, default `3000`
* `HOST` - server host, default `0.0.0.0`
* `CLIENT_DIST_DIR` - frontend build folder, default `dist`
* `DATA_DIR` - order storage folder, default `storage`
* `CORS_ORIGIN` - comma-separated allowed origins for external frontend domains
* `ADMIN_TOKEN` - token for protected order list access
* `VITE_PRODUCTS_API_URL` - external products API URL; when empty, local products are used
* `VITE_PRODUCTS_API_RESPONSE_PATH` - products array path in the API response, default `products`
* `VITE_SELLER_ID` - seller identifier used for generated product ids

Orders are stored as JSON Lines in `storage/orders.jsonl` for the MVP. This can later be replaced with PostgreSQL, Supabase, Firebase, or another database without changing the checkout UI.

## Product API Adapter

The storefront can use an external product API without changing the slide UI.

Flow:

```text
External API product -> universal adapter -> CatalogProduct -> ProductSlide -> Feed
```

Key files:

* `src/data/catalogSourceConfig.ts` - API URL and field mapping
* `src/services/catalog/universalProductAdapter.ts` - universal field adapter
* `src/hooks/useCatalogSlides.ts` - API loading and fallback
* `src/services/catalog/productToSlide.ts` - normalized product to slide

Fallback behavior:

* If `VITE_PRODUCTS_API_URL` is empty, the storefront uses local products.
* If the external API fails, returns invalid data, or returns no compatible products, the storefront falls back to local products.
* Local products remain the safe default for design previews and offline development.

Example field mapping paths:

```ts
{
  id: ['id', 'product_id', 'sku'],
  title: ['title', 'name', 'productName'],
  price: ['price', 'price.amount'],
  image: ['image.url', 'images.0.url', 'thumbnail']
}
```

## Architecture

Core Platform

* Shared API
* Product Management
* Order Management
* Payment Processing
* Admin Panel

Storefront Layer

* Seller Storefronts
* Product Feed
* Product Pages
* Cart
* Checkout

Future Clients

* Web Storefront
* Mobile Application
* Seller Dashboard

## Project Structure

src/
├── app/
├── pages/
├── components/
├── services/
├── data/
├── hooks/
├── types/
└── styles/

## Roadmap

### Phase 1

* Product Feed
* Product Page
* Cart
* Routing
* Mock Data

### Phase 2

* API Integration
* Authentication
* Seller Profiles

### Phase 3

* Orders
* Payments
* Checkout

### Phase 4

* Multi-Seller Support
* Theme System
* Mobile Application

## Status

🚧 Active Development

This project is currently in the MVP stage.
