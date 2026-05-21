import medusaClient from "@/lib/medusa"

export async function POST(
  request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const body = await request.json()
    const { provider_id } = body

    const { cart } = await medusaClient.carts.setPaymentSession(params.cartId, {
      provider_id,
    })

    return Response.json({ cart })
  } catch (error: any) {
    console.error("Failed to set payment session:", error.message)
    return Response.json(
      { error: "Failed to set payment session" },
      { status: 500 }
    )
  }
}
