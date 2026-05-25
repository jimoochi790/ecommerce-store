import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { cn, formatPrice, getProductThumbnail, getVariantPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const thumbnail = getProductThumbnail(product)
  const variant = product.variants?.[0]
  const price = variant ? getVariantPrice(variant) : 0

  const hasMultipleVariants = (product.variants?.length ?? 0) > 1

  return (
    <Link
      href={`/products/${product.handle || product.id}`}
      className={cn("card group block overflow-hidden rounded-lg", className)}
    >
      <div className="relative aspect-square overflow-hidden bg-retro-bg">
        <Image
          src={thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Pixel border overlay */}
        <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-neon-cyan/30" />

        {hasMultipleVariants && (
          <span className="absolute left-2 top-2 border border-retro-border bg-retro-bg/90 px-2 py-0.5 font-pixel text-[9px] uppercase text-neon-cyan backdrop-blur-sm">
            {product.variants.length} OPTIONS
          </span>
        )}
      </div>
      <div className="border-t-2 border-retro-border p-4">
        <h3 className="font-pixel text-[11px] uppercase text-gray-700 line-clamp-1 group-hover:text-neon-cyan">
          {product.title}
        </h3>
        <p className="mt-2 font-pixel text-sm text-neon-pink glow-text-pink">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  )
}
