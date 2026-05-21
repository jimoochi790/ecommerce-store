"use client"

import { useState } from "react"
import { useProducts, useCategories } from "@/hooks/use-data"
import type { SORT_OPTION, Category } from "@/lib/types"
import ProductGrid from "@/components/ProductGrid"
import SearchBar from "@/components/SearchBar"

const sortOptions: { value: SORT_OPTION | ""; label: string }[] = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "title_asc", label: "Name: A-Z" },
  { value: "title_desc", label: "Name: Z-A" },
  { value: "created_at", label: "Newest" },
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<SORT_OPTION | "">("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const query: Record<string, any> = {}
  if (search) query.q = search
  if (sort) query.sort = sort
  if (selectedCategory) query.category_id = selectedCategory

  const { data, isLoading } = useProducts(query)
  const { data: categoriesData } = useCategories()

  const products = data?.products || []
  const count = data?.count ?? 0
  const categories = categoriesData?.categories || []

  const filterSidebar = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-neutral-900">Search</h3>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-neutral-900">Categories</h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              !selectedCategory
                ? "bg-neutral-100 font-medium text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-neutral-100 font-medium text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Products
          {count > 0 && (
            <span className="ml-2 text-lg font-normal text-neutral-400">
              ({count})
            </span>
          )}
        </h1>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="btn-ghost lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      {mobileFiltersOpen && (
        <div className="mt-6 animate-slide-up rounded-xl border border-neutral-200 bg-white p-6 shadow-sm lg:hidden">
          {filterSidebar}
        </div>
      )}

      <div className="mt-8 flex gap-10">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-28">{filterSidebar}</div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              {isLoading
                ? "Loading..."
                : `Showing ${products.length} of ${count} products`}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SORT_OPTION | "")}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 shadow-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  )
}
