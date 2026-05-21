import medusaClient from "@/lib/medusa"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const { cart } = await medusaClient.carts.retrieve(params.cartId)

    return Response.json({ cart })
  } catch (error: any) {
    console.error("Failed to fetch cart:", error.message)
    return Response.json({ error: "Cart not found" }, { status: 404 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    // Medusa JS v6 doesn't expose carts.delete directly.
    // Instead, remove all line items to clear the cart.
    const { cart } = await medusaClient.carts.retrieve(params.cartId)
    if (cart?.items?.length) {
      await Promise.all(
        cart.items.map((item: any) =>
          medusaClient.carts.lineItems.delete(params.cartId, item.id)
        )
      )
    }
    return Response.json({ success: true })
  } catch (error: any) {
    return Response.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    )
  }
}
