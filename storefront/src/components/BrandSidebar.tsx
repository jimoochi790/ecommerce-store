"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Brand {
  name: string
  slug: string
  color: string
  comingSoon?: boolean
}

const brands: Brand[] = [
  { name: "Miyoo", slug: "miyoo", color: "neon-cyan" },
  { name: "Anbernic", slug: "anbernic", color: "neon-pink" },
  { name: "Retroid", slug: "retroid", color: "neon-yellow" },
  { name: "AYN", slug: "ayn", color: "neon-green" },
  { name: "TrimUI", slug: "trimui", color: "neon-purple" },
]

const colorMap: Record<string, string> = {
  "neon-cyan": "text-neon-cyan border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]",
  "neon-pink": "text-neon-pink border-neon-pink hover:bg-neon-pink/10 hover:shadow-[0_0_12px_rgba(255,45,149,0.3)]",
  "neon-yellow": "text-neon-yellow border-neon-yellow hover:bg-neon-yellow/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)]",
  "neon-green": "text-neon-green border-neon-green hover:bg-neon-green/10 hover:shadow-[0_0_12px_rgba(57,255,20,0.3)]",
  "neon-purple": "text-neon-purple border-neon-purple hover:bg-neon-purple/10 hover:shadow-[0_0_12px_rgba(180,77,255,0.3)]",
}

export default function BrandSidebar() {
  const searchParams = useSearchParams()
  const currentQ = searchParams.get("q") || ""

  return (
    <div>
      <h3 className="mb-3 font-pixel text-xs uppercase text-neon-cyan">
        {"// BRANDS"}
      </h3>
      <div className="space-y-1.5">
        {brands.map((brand) => {
          const isActive = currentQ.toLowerCase().includes(brand.slug)
          return (
            <Link
              key={brand.slug}
              href={`/products?q=${brand.slug}`}
              className={`block border-l-2 px-3 py-2 font-pixel text-[10px] uppercase tracking-wider transition-all ${
                isActive
                  ? `${colorMap[brand.color]} border-l-4`
                  : `border-transparent text-gray-500 hover:border-current ${colorMap[brand.color]}`
              }`}
            >
              <span className="mr-2 opacity-50">{"//"}</span>
              {brand.name}
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-retro-border" />
    </div>
  )
}
