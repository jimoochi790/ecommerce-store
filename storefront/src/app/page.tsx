     1|"use client"
     2|
     3|import Link from "next/link"
     4|import { useProducts } from "@/hooks/use-data"
     5|import ProductGrid from "@/components/ProductGrid"
     6|
     7|export default function HomePage() {
     8|  const { data: featuredData } = useProducts({ limit: 4 })
     9|
    10|  const products = featuredData?.products || []
    11|
    12|  return (
    13|    <div>
    14|      {/* Hero Section - Banner */}
    15|      <section className="relative overflow-hidden bg-retro-bg">
    16|        {/* Banner image */}
    17|        <div
    18|          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    19|          style={{
    20|            backgroundImage: "url(/miyoo-banner.jpg)",
    21|          }}
    22|        />
    23|        {/* Dark overlay for text readability */}
    24|        <div className="absolute inset-0 bg-black/60" />
    25|        <div className="absolute inset-0 bg-gradient-to-t from-retro-bg via-transparent to-transparent" />
    26|
    27|        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    28|          <div className="mx-auto max-w-2xl text-center">
    29|            {/* Retro badge */}
    30|            <div className="mb-3 inline-block border-2 border-neon-cyan px-3 py-1">
    31|              <span className="font-pixel text-[8px] uppercase tracking-widest text-neon-cyan">
    32|                // MIYOO MINI
    33|              </span>
    34|            </div>
    35|
    36|            <h1 className="font-pixel text-2xl leading-relaxed text-white sm:text-3xl lg:text-4xl">
    37|              <span className="text-neon-cyan glow-text">PIXEL PERFECT</span>
    38|              <br />
    39|              <span className="text-gray-200">RETRO GAMING</span>
    40|            </h1>
    41|
    42|            <p className="mt-3 text-sm leading-6 text-gray-300">
    43|              The Miyoo Mini Plus and Miyoo Flip - the ultimate pocket-sized consoles
    44|              for retro gaming on the go. GameBoy, GBA, SNES, PS1 and more, all in the palm of your hand.
    45|            </p>
    46|
    47|            <div className="mt-5 flex items-center justify-center gap-3">
    48|              <Link
    49|                href="/products?q=miyoo"
    50|                className="btn-primary text-xs"
    51|              >
    52|                ▶ SHOP MIYOO
    53|              </Link>
    54|              <Link
    55|                href="/products"
    56|                className="btn-secondary text-xs border-white/30 text-white hover:bg-white/10"
    57|              >
    58|                ALL PRODUCTS
    59|              </Link>
    60|            </div>
    61|          </div>
    62|        </div>
    63|      </section>
    64|
    65|      {/* Miyoo Mini Plus - Featured */}
    66|      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
    67|        <div className="mb-12 flex items-end justify-between">
    68|          <div>
    69|            <h2 className="font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
    70|              {"// FEATURED"}
    71|            </h2>
    72|            <p className="mt-2 text-sm text-gray-500">
    73|              Miyoo handhelds and more
    74|            </p>
    75|          </div>
    76|          <Link
    77|            href="/products"
    78|            className="hidden font-pixel text-xs text-gray-500 transition-colors hover:text-neon-cyan sm:block"
    79|          >
    80|            VIEW ALL ▶
    81|          </Link>
    82|        </div>
    83|        <ProductGrid products={products.slice(0, 4)} />
    84|        <div className="mt-8 text-center sm:hidden">
    85|          <Link
    86|            href="/products"
    87|            className="font-pixel text-xs text-gray-500 transition-colors hover:text-neon-cyan"
    88|          >
    89|            VIEW ALL ▶
    90|          </Link>
    91|        </div>
    92|      </section>
    93|
    94|      {/* Miyoo ecosystem section */}
    95|      <section className="border-t-2 border-retro-border bg-retro-surface">
    96|        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    97|          <div className="grid gap-8 md:grid-cols-2">
    98|            <div className="rounded-lg border-2 border-neon-cyan/20 bg-retro-card p-8">
    99|              <h3 className="font-pixel text-sm text-neon-cyan glow-text">
   100|                MIYOO MINI PLUS
   101|              </h3>
   102|              <p className="mt-3 text-xs leading-relaxed text-gray-400">
   103|                3.5-inch IPS display, Allwinner A33 quad-core, 256MB RAM.
   104|                Supports PS1, GBA, SNES, NES, arcade and 20+ retro platforms.
   105|                Available in Black, Gray, Purple and White.
   106|              </p>
   107|              <Link
   108|                href="/products/miyoo-mini-plus"
   109|                className="mt-4 inline-block font-pixel text-[10px] text-neon-pink transition-colors hover:text-neon-cyan"
   110|              >
   111|                VIEW DETAILS ▶
   112|              </Link>
   113|            </div>
   114|            <div className="rounded-lg border-2 border-neon-pink/20 bg-retro-card p-8">
   115|              <h3 className="font-pixel text-sm text-neon-pink glow-text-pink">
   116|                MIYOO FLIP
   117|              </h3>
   118|              <p className="mt-3 text-xs leading-relaxed text-gray-400">
   119|                Clamshell design with a familiar retro form factor.
   120|                Compact, portable, and packed with emulation power.
   121|                The perfect companion for retro gaming on the move.
   122|              </p>
   123|              <Link
   124|                href="/products/miyoo-flip"
   125|                className="mt-4 inline-block font-pixel text-[10px] text-neon-cyan transition-colors hover:text-neon-pink"
   126|              >
   127|                VIEW DETAILS ▶
   128|              </Link>
   129|            </div>
   130|          </div>
   131|        </div>
   132|      </section>
   133|
   134|      {/* Australian Seller - Trust */}
   135|      <section className="border-t-2 border-retro-border">
   136|        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
   137|          <div className="mx-auto max-w-xl text-center">
   138|            <div className="mb-3 inline-block border-2 border-neon-yellow px-3 py-1">
   139|              <span className="font-pixel text-[8px] uppercase tracking-widest text-neon-yellow">
   140|                AUSSIE OWNED
   141|              </span>
   142|            </div>
   143|            <h2 className="font-pixel text-lg text-neon-cyan glow-text sm:text-xl">
   144|              {"// SHOP LOCAL"}
   145|            </h2>
   146|            <p className="mt-3 text-sm leading-6 text-gray-400">
   147|              We are an Australian-owned retro gaming store. Every order ships from within Australia
   148|              - no international wait times, no surprise import fees. All prices in AUD.
   149|            </p>
   150|          </div>
   151|
   152|          <div className="mt-10 grid gap-6 sm:grid-cols-3">
   153|            <div className="rounded-lg border border-retro-border bg-retro-card p-6 text-center">
   154|              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-neon-cyan/30">
   155|                <span className="font-pixel text-sm text-neon-cyan">AU</span>
   156|              </div>
   157|              <h3 className="font-pixel text-[10px] uppercase text-gray-200">Australian Seller</h3>
   158|              <p className="mt-1 text-xs text-gray-500">Registered business, local stock, shipped from Australia.</p>
   159|            </div>
   160|            <div className="rounded-lg border border-retro-border bg-retro-card p-6 text-center">
   161|              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-neon-pink/30">
   162|                <span className="font-pixel text-sm text-neon-pink">$</span>
   163|              </div>
   164|              <h3 className="font-pixel text-[10px] uppercase text-gray-200">AUD Pricing</h3>
   165|              <p className="mt-1 text-xs text-gray-500">All prices in Australian dollars. No currency conversion guesswork.</p>
   166|            </div>
   167|            <div className="rounded-lg border border-retro-border bg-retro-card p-6 text-center">
   168|              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-neon-yellow/30">
   169|                <span className="font-pixel text-sm text-neon-yellow">✓</span>
   170|              </div>
   171|              <h3 className="font-pixel text-[10px] uppercase text-gray-200">Secure & Trusted</h3>
   172|              <p className="mt-1 text-xs text-gray-500">30-day returns, fast dispatch, and real support from a real person.</p>
   173|            </div>
   174|          </div>
   175|        </div>
   176|      </section>
   177|
   178|      {/* Bottom CTA */}
   179|      <section className="border-t-2 border-retro-border">
   180|        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
   181|          <h2 className="font-pixel text-xl text-neon-yellow glow-text-pink sm:text-2xl">
   182|            READY PLAYER?
   183|          </h2>
   184|          <p className="mt-4 text-gray-400">
   185|            Free shipping on orders over A$100. 30-day returns.
   186|          </p>
   187|          <div className="mt-8">
   188|            <Link href="/products" className="btn-primary">
   189|              ▶ START COLLECTION
   190|            </Link>
   191|          </div>
   192|        </div>
   193|      </section>
   194|    </div>
   195|  )
   196|}
   197|