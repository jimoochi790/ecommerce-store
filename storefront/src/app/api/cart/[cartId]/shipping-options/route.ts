import medusaClient from "@/lib/medusa"

export async function GET(
  _request: Request,
  { params }: { params: { cartId: string } }
) {
  try {
    const { shipping_options } = await medusaClient.shippingOptions.listCartOptions(params.cartId)
    return Response.json({ shipping_options })
  } catch (error: any) {
    console.error("Failed to fetch shipping options:", error.message)
    return Response.json(
      { shipping_options: [] },
      { status: 500 }
    )
  }
}
