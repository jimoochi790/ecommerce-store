# Medusa Backend

Headless commerce server powered by Medusa.js.

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy and configure environment
cp .env.template .env
# Edit .env — set your STRIPE_API_KEY, JWT_SECRET,COOKIE_SECRET

# 3. Start PostgreSQL and Redis (from repo root)
docker compose up -d

# 4. Run migrations
pnpm migrate

# 5. Seed the database with sample products
pnpm seed

# 6. Start development server
pnpm dev
```

The server runs at **http://localhost:9000**.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5432/medusa_store` | PostgreSQL connection |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection |
| `JWT_SECRET` | (required) | Secret for signing JWTs |
| `COOKIE_SECRET` | (required) | Secret for signed cookies |
| `STRIPE_API_KEY` | (required) | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | (required) | Stripe webhook signing secret |
| `STORE_CORS` | `http://localhost:3001` | Allowed storefront origins |

## API Endpoints

### Store API (public)

| Endpoint | Description |
|---|---|
| `GET /store/products` | List products |
| `GET /store/products/:id` | Get product details |
| `GET /store/products?handle=:handle` | Get product by handle |
| `POST /store/carts` | Create a cart |
| `GET /store/carts/:id` | Get cart |
| `POST /store/carts/:id/line-items` | Add item to cart |
| `POST /store/carts/:id/line-items/:line_id` | Update line item |
| `DELETE /store/carts/:id/line-items/:line_id` | Remove line item |
| `POST /store/carts/:id/shipping-methods` | Add shipping method |
| `POST /store/carts/:id/payment-sessions` | Initialize payment |
| `POST /store/carts/:id/complete` | Complete cart (order) |
| `GET /store/shipping-options/:cart_id` | Get shipping options |
| `GET /store/regions` | List regions |
| `GET /store/collections` | List collections |

## Seed Products

The seed script creates 8 clothing products across 4 categories:

- **T-Shirts**: Classic Crew Tee, Slim Fit Oxford Shirt
- **Hoodies**: Vintage Wash Hoodie
- **Jackets**: Tech Shell Jacket, Merino Wool Quarter-Zip
- **Accessories**: Relaxed Linen Shorts, Knitted Beanie, Canvas Tote Bag

Each product has size and color variants with real inventory quantities.
