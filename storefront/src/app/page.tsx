"use client"

import Link from "next/link"
import { useProducts } from "@/hooks/use-data"
import ProductGrid from "@/components/ProductGrid"

export default function HomePage() {
  const { data: featuredData } = useProducts({ limit: 4 })

  const products = featuredData?.products || []

  return (
    <div>
      {/* Hero Section — Miyoo Focus */}
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
            <div className="mb-3 inline-block border-2 border-neon-cyan px-3 py-1">
              <span className="font-pixel text-[8px] uppercase tracking-widest text-neon-cyan">
                // MIYOO MINI
              </span>
            </div>

            <h1 className="font-pixel text-2xl leading-relaxed text-white sm:text-3xl lg:text-4xl">
              <span className="text-neon-cyan glow-text">PIXEL PERFECT</span>
              <br />
              <span className="text-gray-300">RETRO GAMING</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              The Miyoo Mini Plus and Miyoo Flip — the ultimate pocket-sized consoles
              for retro gaming on the go. GameBoy, GBA, SNES, PS1 and more, all in the palm of your hand.
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/products?q=miyoo"
                className="btn-primary text-xs"
              >
                ▶ SHOP MIYOO
              </Link>
              <Link
                href="/products"
                className="btn-secondary text-xs"
              >
                ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Miyoo Mini Plus — Featured */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
              {"// FEATURED"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Miyoo handhelds and more
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

      {/* Miyoo ecosystem section */}
      <section className="border-t-2 border-retro-border bg-retro-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border-2 border-neon-cyan/20 bg-retro-card p-8">
              <h3 className="font-pixel text-sm text-neon-cyan glow-text">
                MIYOO MINI PLUS
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-400">
                3.5-inch IPS display, Allwinner A33 quad-core, 256MB RAM.
                Supports PS1, GBA, SNES, NES, arcade and 20+ retro platforms.
                Available in Black, Gray, Purple and White.
              </p>
              <Link
                href="/products/miyoo-mini-plus"
                className="mt-4 inline-block font-pixel text-[10px] text-neon-pink transition-colors hover:text-neon-cyan"
              >
                VIEW DETAILS ▶
              </Link>
            </div>
            <div className="rounded-lg border-2 border-neon-pink/20 bg-retro-card p-8">
              <h3 className="font-pixel text-sm text-neon-pink glow-text-pink">
                MIYOO FLIP
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-400">
                Clamshell design with a familiar retro form factor.
                Compact, portable, and packed with emulation power.
                The perfect companion for retro gaming on the move.
              </p>
              <Link
                href="/products/miyoo-flip"
                className="mt-4 inline-block font-pixel text-[10px] text-neon-cyan transition-colors hover:text-neon-pink"
              >
                VIEW DETAILS ▶
              </Link>
            </div>
          </div>
        </div>
      </section>

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
