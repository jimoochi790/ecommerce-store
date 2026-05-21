// Auto-creates admin user + sample products on first startup
import { MedusaContainer } from "@medusajs/medusa"

export default async function setupLoader(container: MedusaContainer) {
  try {
    const userService = container.resolve("userService")
    const productService = container.resolve("productService")
    const regionService = container.resolve("regionService")
    const storeService = container.resolve("storeService")

    // Ensure region exists
    const regions = await regionService.list({})
    if (regions.length === 0) {
      await regionService.create({
        name: "Worldwide",
        currency_code: "usd",
        tax_rate: 0,
        countries: ["us"],
      })
      console.log("✓ Created default region")
    }

    // Create admin user if missing
    const users = await userService.list({ email: "admin@hermes.store" })
    if (users.length === 0) {
      await userService.create({
        email: "admin@hermes.store",
        password: "admin123",
        first_name: "Admin",
        last_name: "User",
      })
      console.log("✓ Admin user created: admin@hermes.store / admin123")
    }

    // Seed sample products if none exist
    const products = await productService.list({})
    if (products.length === 0) {
      const region = (await regionService.list({}))[0]
      if (region) {
        const items = [
          { title: "Hermes Logo Tee", description: "Premium cotton t-shirt with embroidered logo", variants: [{ title: "S", prices: [{ currency_code: "usd", amount: 2900 }] }, { title: "M", prices: [{ currency_code: "usd", amount: 2900 }] }, { title: "L", prices: [{ currency_code: "usd", amount: 2900 }] }] },
          { title: "Hermes Hoodie", description: "Cozy fleece hoodie for chilly nights", variants: [{ title: "M", prices: [{ currency_code: "usd", amount: 5900 }] }, { title: "L", prices: [{ currency_code: "usd", amount: 5900 }] }] },
          { title: "Hermes Cap", description: "Classic snapback with embroidered patch", variants: [{ title: "One Size", prices: [{ currency_code: "usd", amount: 2400 }] }] },
          { title: "Hermes Tote Bag", description: "Canvas tote for your daily carry", variants: [{ title: "One Size", prices: [{ currency_code: "usd", amount: 1900 }] }] },
        ]

        for (const item of items) {
          await productService.create({
            title: item.title,
            description: item.description,
            status: "published",
            variants: item.variants.map((v) => ({
              title: v.title,
              prices: v.prices.map((p) => ({
                currency_code: p.currency_code,
                amount: p.amount,
              })),
            })),
          })
          console.log(`✓ Created: ${item.title}`)
        }
        console.log(`✓ Seeded ${items.length} products`)
      }
    }
  } catch (err) {
    console.error("Setup loader error:", err.message)
    // Don't crash — let the server start anyway
  }
}
