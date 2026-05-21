# Medusa Ecommerce Store

A full-featured ecommerce store for physical goods built with [Medusa.js](https://medusajs.com/) and [Next.js](https://nextjs.org/).

## Architecture

```
ecommerce-store/
├── backend/          # Medusa.js headless commerce server
├── storefront/       # Next.js 14 App Router storefront
└── docker-compose.yml
```

## Prerequisites

- Node.js 18+
- pnpm 8+
- Docker & Docker Compose (for PostgreSQL)
- Stripe account (for payments)

## Quick Start

```bash
# 1. Start PostgreSQL and Redis
docker compose up -d

# 2. Set up the backend
cp backend/.env.template backend/.env
# Edit backend/.env with your Stripe keys
cd backend
pnpm install
pnpm build
pnpm seed
pnpm dev        # runs on http://localhost:9000

# 3. Set up the storefront (new terminal)
cd storefront
cp .env.template .env.local
pnpm install
pnpm dev        # runs on http://localhost:3001
```

## Environment Variables

### Backend (.env)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_API_KEY` | Stripe secret key |
| `JWT_SECRET` | Secret for JWT tokens |
| `COOKIE_SECRET` | Secret for signed cookies |
| `CORS_STORE` | Storefront CORS origin |

### Storefront (.env.local)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Medusa backend URL |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_STORE_URL` | Storefront URL |

## Features

- Product catalog with categories, variants (size/color), and inventory tracking
- Product listing with filters and search
- Product detail page with variant selector and quantity picker
- Shopping cart with persistent cart management
- Stripe checkout flow
- Responsive, modern UI with Tailwind CSS
- PostgreSQL database with seed data (8 sample clothing products)

## License

MIT
