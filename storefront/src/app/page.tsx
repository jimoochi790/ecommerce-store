"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useProducts, useCategories } from "@/hooks/use-data"
import ProductGrid from "@/components/ProductGrid"
import BrandSidebar from "@/components/BrandSidebar"

export default function HomePage() {
  const { data: featuredData } = useProducts({ limit: 4 })
  const { data: categoriesData } = useCategories()

  const products = featuredData?.products || []
  const categories = categoriesData?.categories || []

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-retro-bg">
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-neon-cyan/10 blur-[80px]" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-neon-pink/10 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Retro badge */}
            <div className="mb-3 inline-block border-2 border-neon-yellow px-3 py-1">
              <span className="font-pixel text-[8px] uppercase tracking-widest text-neon-yellow">
                New Drop
              </span>
            </div>

            <h1 className="font-pixel text-2xl leading-relaxed text-white sm:text-3xl lg:text-4xl">
              <span className="text-neon-cyan glow-text">LEVEL UP</span>
              <br />
              <span className="text-neon-pink glow-text-pink">YOUR GAME</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Premium retro gaming handhelds for the modern collector.
              Relive the golden age of gaming — in your pocket.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/products"
                className="btn-primary text-xs"
              >
                ▶ SHOP NOW
              </Link>
              <Link
                href="/products?sort=created_at"
                className="btn-secondary text-xs"
              >
                NEW ARRIVALS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
              {"// FEATURED"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Handpicked classics for your collection
            </p>
          </div>
          <Link
            href="/products"
            className="hidden font-pixel text-xs text-gray-500 transition-colors hover:text-neon-cyan sm:block"
          >
            VIEW ALL ▶
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 4)} />
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="font-pixel text-xs text-gray-500 transition-colors hover:text-neon-cyan"
          >
            VIEW ALL ▶
          </Link>
        </div>
      </section>

      {/* Brands Section */}
      <section className="border-t-2 border-retro-border bg-retro-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
            {"// BROWSE BY BRAND"}
          </h2>
          <div className="mx-auto max-w-md">
            <Suspense fallback={null}>
              <BrandSidebar />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Categories - if any */}
      {categories.length > 0 && (
        <section className="border-t-2 border-retro-border bg-retro-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="mb-12 font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
              {"// CATEGORIES"}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category_id=${category.id}`}
                  className="card group relative flex min-h-[200px] flex-col justify-end overflow-hidden bg-retro-card p-8"
                >
                  <h3 className="font-pixel text-sm text-gray-200 transition-colors group-hover:text-neon-cyan">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <span className="mt-4 font-pixel text-[10px] text-gray-600 group-hover:text-neon-cyan">
                    BROWSE ▶
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="border-t-2 border-retro-border">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-pixel text-xl text-neon-yellow glow-text-pink sm:text-2xl">
            READY PLAYER?
          </h2>
          <p className="mt-4 text-gray-400">
            Free shipping on orders over A$100. 30-day returns.
          </p>
          <div className="mt-8">
            <Link href="/products" className="btn-primary">
              ▶ START COLLECTION
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
