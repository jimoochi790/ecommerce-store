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
      className={cn("card group block overflow-hidden", className)}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {hasMultipleVariants && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
            {product.variants.length} options
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-neutral-900 line-clamp-1">
          {product.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-neutral-900">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  )
}
