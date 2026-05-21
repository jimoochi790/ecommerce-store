import medusaClient from "@/lib/medusa"

export async function POST(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    await medusaClient.carts.createPaymentSessions(params.cartId)
    const { cart } = await medusaClient.carts.retrieve(params.cartId)
    return Response.json({ cart })
  } catch (error: any) {
    console.error("Failed to create payment sessions:", error.message)
    return Response.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    )
  }
}
