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

const plugins = [
  `medusa-fulfillment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY || "sk_test_placeholder",
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET || "",
    },
  },
]

module.exports = {
  projectConfig: {
    port: parseInt(process.env.PORT) || 9000,
    database_type: "postgres",
    database_url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,
    database_extra:
      { 
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      },
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
    store_cors: process.env.STORE_CORS || "http://localhost:3001",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:3001",
    database_schema: "public",
    database_logging: true,
  },
  plugins,
}
