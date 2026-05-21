import medusaClient from "@/lib/medusa"

export async function GET() {
  try {
    const { product_categories } =
      (await medusaClient.productCategories.list()) as any

    const categories = (product_categories || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      handle: cat.handle,
      description: cat.description || "",
    }))

    return Response.json({ categories })
  } catch (error: any) {
    console.error("Failed to fetch categories:", error.message)
    return Response.json({ categories: [] }, { status: 500 })
  }
}
