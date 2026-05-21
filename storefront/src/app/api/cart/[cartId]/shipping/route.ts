import medusaClient from "@/lib/medusa"

export async function POST(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const body = await request.json()
    const { option_id } = body

    await medusaClient.carts.addShippingMethod(params.cartId, {
      option_id,
    })

    const { cart } = await medusaClient.carts.retrieve(params.cartId)
    return Response.json({ cart })
  } catch (error: any) {
    console.error("Failed to add shipping:", error.message)
    return Response.json(
      { error: "Failed to add shipping method" },
      { status: 500 }
    )
  }
}
