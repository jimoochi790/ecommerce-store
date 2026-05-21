import medusaClient from "@/lib/medusa"
import type { Cart } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { variant_id, quantity, cart_id } = body

    let cartId = cart_id
    let cart: any

    if (!cartId) {
      const { cart: newCart } = await medusaClient.carts.create({
        region_id: body.region_id,
      })
      cartId = newCart.id
      cart = newCart
    }

    const { cart: updatedCart } = await medusaClient.carts.lineItems.create(
      cartId,
      {
        variant_id,
        quantity: quantity || 1,
      }
    )

    return Response.json({ cart: updatedCart })
  } catch (error: any) {
    console.error("Failed to add to cart:", error.message)
    return Response.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
