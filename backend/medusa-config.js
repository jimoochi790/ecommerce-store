const dotenv = require("dotenv")

let ENV_FILE_NAME = ""
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production"
    break
  case "staging":
    ENV_FILE_NAME = ".env.staging"
    break
  case "test":
    ENV_FILE_NAME = ".env.test"
    break
  default:
    ENV_FILE_NAME = ".env"
    break
}

dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME })

const CORS_OPTIONS = {
  origin: (process.env.STORE_CORS || "").split(",").map((s) => s.trim()),
  credentials: true,
}

const ADMIN_CORS_OPTIONS = {
  origin: (process.env.ADMIN_CORS || "").split(",").map((s) => s.trim()),
  credentials: true,
}

const plugins = [
  `medusa-fulfillment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY || "sk_test_placeholder",
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET || "",
    },
  },
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY_ID,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    },
  },
  {
    resolve: `@medusajs/cache-inmemory`,
    options: { ttl: 30 },
  },
  {
    resolve: `@medusajs/event-bus-local`,
  },
]

module.exports = {
  projectConfig: {
    database_type: "postgres",
    database_url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,
    database_extra:
      process.env.NODE_ENV === "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOOKIE_SECRET || "supersecret",
    store_cors: CORS_OPTIONS,
    admin_cors: ADMIN_CORS_OPTIONS,
    database_schema: "public",
    database_logging: false,
  },
  modules: {
    /* eventBus: {
      resolve: "@medusajs/event-bus-local",
    },
    cacheService: {
      resolve: "@medusajs/cache-inmemory",
    }, */
  },
  plugins,
}
