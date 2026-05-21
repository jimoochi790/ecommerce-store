import medusaClient from "@/lib/medusa"

export async function PUT(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const body = await request.json()
    const { line_id, quantity } = body
    const { cart } = await medusaClient.carts.lineItems.update(
      params.cartId,
      line_id,
      {
        quantity,
      }
    )
    return Response.json({ cart })
  } catch (error: any) {
    return Response.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const { line_id } = await request.json()
    const { cart } = await medusaClient.carts.lineItems.delete(
      params.cartId,
      line_id
    )
    return Response.json({ cart })
  } catch (error: any) {
    return Response.json({ error: "Failed to remove item" }, { status: 500 })
  }
}
