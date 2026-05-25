"use client"

import Link from "next/link"
import { useProducts } from "@/hooks/use-data"
import ProductGrid from "@/components/ProductGrid"

export default function HomePage() {
  const { data: featuredData } = useProducts({ limit: 4 })

  const products = featuredData?.products || []

  return (
    <div>
      {/* Hero Section - Banner */}
      <section className="relative overflow-hidden bg-retro-bg">
        {/* Banner image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/miyoo-banner.jpg)",
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-retro-bg via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* AU flag badge - visible above fold */}
          <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
            <div className="flex items-center gap-2 rounded-sm border border-white/10 bg-aussie-navy/80 px-2.5 py-1.5 backdrop-blur-sm">
              {/* Mini flag */}
              <div className="relative h-5 w-8 flex-shrink-0 overflow-hidden rounded-sm bg-aussie-blue">
                <div className="absolute left-0 top-0 h-2.5 w-2.5 bg-aussie-red">
                  <div className="absolute left-[3px] top-[1px] h-[3px] w-[3px] rotate-45 bg-white" />
                  <div className="absolute left-[1px] top-[3px] h-[3px] w-[3px] rotate-45 bg-white" />
                </div>
                <div className="absolute right-[3px] top-[2px] h-1 w-1 rounded-full bg-white/90" />
                <div className="absolute right-[9px] top-[1px] h-[3px] w-[2px] rotate-45 rounded-full bg-white/90" />
                <div className="absolute right-[6px] top-[7px] h-[2px] w-[2px] rounded-full bg-white/90" />
                <div className="absolute right-[12px] top-[9px] h-[2px] w-[2px] rounded-full bg-white/80" />
                <div className="absolute right-[15px] top-[4px] h-[2px] w-[2px] rounded-full bg-white/80" />
              </div>
              <span className="font-pixel text-[9px] uppercase tracking-wider text-white/80">
                AU
              </span>
            </div>
          </div>
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
              <span className="text-gray-200">RETRO GAMING</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              The Miyoo Mini Plus and Miyoo Flip - the ultimate pocket-sized consoles
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
                className="btn-secondary text-xs border-white/30 text-white hover:bg-white/10"
              >
                ALL PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Miyoo Mini Plus - Featured */}
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

      {/* Australian Seller - Trust */}
      <section className="relative overflow-hidden border-t-2 border-retro-border">
        {/* Australian flag glow overlay */}
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-aussie-blue/10 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-aussie-red/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            {/* Aussie badge with flag colors */}
            <div className="mb-3 inline-flex items-center gap-1.5 overflow-hidden rounded-sm border-2 border-aussie-blue px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-aussie-red" />
              <span className="font-pixel text-[8px] uppercase tracking-widest text-aussie-blue">
                AUSSIE OWNED
              </span>
              <span className="h-2 w-2 rounded-full bg-aussie-red" />
            </div>
            <h2 className="font-pixel text-lg text-white sm:text-xl">
              {"// SHOP LOCAL"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              We are an Australian-owned retro gaming store. Every order ships from within Australia
              - no international wait times, no surprise import fees. All prices in AUD.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-aussie-blue/20 bg-retro-card/80 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-aussie-blue/40">
                <span className="font-pixel text-xs font-bold text-aussie-blue">AU</span>
              </div>
              <h3 className="font-pixel text-[10px] uppercase text-white">Australian Seller</h3>
              <p className="mt-1 text-xs text-gray-500">Registered business, local stock, shipped from Australia.</p>
            </div>
            <div className="rounded-lg border border-aussie-red/20 bg-retro-card/80 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-aussie-red/40">
                <span className="font-pixel text-xs font-bold text-aussie-red">$</span>
              </div>
              <h3 className="font-pixel text-[10px] uppercase text-white">AUD Pricing</h3>
              <p className="mt-1 text-xs text-gray-500">All prices in Australian dollars. No currency conversion guesswork.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-retro-card/80 p-6 text-center backdrop-blur-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/20">
                <span className="font-pixel text-xs font-bold text-white">✓</span>
              </div>
              <h3 className="font-pixel text-[10px] uppercase text-white">Secure & Trusted</h3>
              <p className="mt-1 text-xs text-gray-500">30-day returns, fast dispatch, and real support from a real person.</p>
            </div>
          </div>

          {/* Subtle flag stripe bar */}
          <div className="mx-auto mt-8 flex h-1 max-w-xs overflow-hidden rounded-full">
            <div className="h-full w-1/3 bg-aussie-blue" />
            <div className="h-full w-1/3 bg-white/60" />
            <div className="h-full w-1/3 bg-aussie-red" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t-2 border-retro-border">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-pixel text-xl text-neon-yellow glow-text-pink sm:text-2xl">
            READY PLAYER?
          </h2>
          <p className="mt-4 text-gray-600">
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
