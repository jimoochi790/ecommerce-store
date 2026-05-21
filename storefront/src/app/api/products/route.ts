import medusaClient from "@/lib/medusa"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query: Record<string, any> = {}

    if (searchParams.has("limit")) query.limit = parseInt(searchParams.get("limit")!)
    if (searchParams.has("offset")) query.offset = parseInt(searchParams.get("offset")!)
    if (searchParams.has("handle")) query.handle = searchParams.get("handle")
    if (searchParams.has("category_id")) query.category_id = [searchParams.get("category_id")]
    if (searchParams.has("q")) query.q = searchParams.get("q")
    if (searchParams.has("tags")) query.tags = searchParams.get("tags")!.split(",")
    if (searchParams.has("collection_id")) query.collection_id = [searchParams.get("collection_id")]

    const sort = searchParams.get("sort")
    if (sort) {
      switch (sort) {
        case "price_asc":
          query.order = "variants.prices.amount"
          break
        case "price_desc":
          query.order = "-variants.prices.amount"
          break
        case "title_asc":
          query.order = "title"
          break
        case "title_desc":
          query.order = "-title"
          break
        default:
          query.order = "-created_at"
      }
    }

    const { products, count } = await medusaClient.products.list(query)

    return Response.json({ products, count })
  } catch (error: any) {
    console.error("Failed to fetch products:", error.message)
    return Response.json({ products: [], count: 0 }, { status: 500 })
  }
}
