import { Router } from "express"
import { MedusaContainer } from "@medusajs/medusa"

const setupRouter = Router()

setupRouter.get("/store/setup", async (req, res) => {
  try {
    const container: MedusaContainer = (req as any).scope
    const userService = container.resolve("userService")
    const productService = container.resolve("productService")
    const regionService = container.resolve("regionService")

    // Region
    const regions = await regionService.list({})
    if (regions.length === 0) {
      await regionService.create({
        name: "Worldwide",
        currency_code: "usd",
        tax_rate: 0,
        countries: ["us"],
      })
    }

    // Admin
    const users = await userService.list({ email: "admin@hermes.store" })
    if (users.length === 0) {
      await userService.create({
        email: "admin@hermes.store",
        password: "admin123",
        first_name: "Admin",
        last_name: "User",
      })
    }

    // Products
    const prods = await productService.list({})
    if (prods.length === 0) {
      for (const item of [
        { title: "Hermes Logo Tee", description: "Premium cotton t-shirt", variants: [{ title: "S", prices: [{ currency_code: "usd", amount: 2900 }] }, { title: "M", prices: [{ currency_code: "usd", amount: 2900 }] }, { title: "L", prices: [{ currency_code: "usd", amount: 2900 }] }] },
        { title: "Hermes Hoodie", description: "Cozy fleece hoodie", variants: [{ title: "M", prices: [{ currency_code: "usd", amount: 5900 }] }, { title: "L", prices: [{ currency_code: "usd", amount: 5900 }] }] },
        { title: "Hermes Cap", description: "Classic snapback", variants: [{ title: "One Size", prices: [{ currency_code: "usd", amount: 2400 }] }] },
        { title: "Hermes Tote Bag", description: "Canvas tote bag", variants: [{ title: "One Size", prices: [{ currency_code: "usd", amount: 1900 }] }] },
      ]) {
        await productService.create({
          title: item.title,
          description: item.description,
          status: "published",
          variants: item.variants.map((v: any) => ({
            title: v.title,
            prices: v.prices.map((p: any) => ({
              currency_code: p.currency_code,
              amount: p.amount,
            })),
          })),
        })
      }
    }

    res.json({ success: true, admin: { email: "admin@hermes.store", password: "admin123" }, products: 4 })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack })
  }
})

export default () => [setupRouter]
