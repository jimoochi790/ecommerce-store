"use client"

import Link from "next/link"
import { useProducts, useCategories } from "@/hooks/use-data"
import ProductGrid from "@/components/ProductGrid"

export default function HomePage() {
  const { data: featuredData } = useProducts({ limit: 4 })
  const { data: categoriesData } = useCategories()

  const products = featuredData?.products || []
  const categories = categoriesData?.categories || []

  return (
    <div>
      <section className="relative overflow-hidden bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium products for modern living
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Discover our curated collection of high-quality essentials
              designed for everyday life. Thoughtfully crafted, responsibly made.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/products" className="rounded-lg bg-white px-8 py-4 text-base font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100">
                Shop All
              </Link>
              <Link href="/products?sort=created_at" className="rounded-lg border border-neutral-400 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-neutral-800">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-800 to-neutral-900" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-2 text-neutral-500">
              Our most popular picks
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:block"
          >
            View all &rarr;
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} />
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            View all products &rarr;
          </Link>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Shop by Category
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category_id=${category.id}`}
                  className="card group relative flex min-h-[200px] flex-col justify-end overflow-hidden bg-neutral-100 p-8"
                >
                  <h3 className="text-lg font-semibold text-neutral-900 transition-colors group-hover:text-neutral-700">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <span className="mt-4 text-sm font-medium text-neutral-600 group-hover:text-neutral-900">
                    Browse &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
