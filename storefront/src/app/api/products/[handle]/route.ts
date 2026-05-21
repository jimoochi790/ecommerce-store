import medusaClient from "@/lib/medusa"

export async function GET(
  _request: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const { products } = await medusaClient.products.list({
      handle: params.handle,
    })

    if (products.length === 0) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }

    return Response.json({ product: products[0] })
  } catch (error: any) {
    console.error("Failed to fetch product:", error.message)
    return Response.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
