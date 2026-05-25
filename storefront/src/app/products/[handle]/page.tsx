"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useProduct } from "@/hooks/use-data"
import { useCartStore } from "@/hooks/use-cart-store"
import {
  formatPrice,
  getProductThumbnail,
  getVariantPrice,
} from "@/lib/utils"
import type { ProductVariant } from "@/lib/types"
import VariantSelector from "@/components/VariantSelector"
import QuantityPicker from "@/components/QuantityPicker"

export default function ProductDetailPage() {
  const params = useParams()
  const handle = params?.handle as string

  const { data, isLoading } = useProduct(handle)
  const product = data?.product

  const cartId = useCartStore((s) => s.cartId)
  const setCartId = useCartStore((s) => s.setCartId)

  const [selectedOpts, setSelectedOpts] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [manualImageIdx, setManualImageIdx] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin border-2 border-retro-border border-t-neon-cyan" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <p className="font-pixel text-sm text-neon-pink">404 // PRODUCT NOT FOUND</p>
      </div>
    )
  }

  const thumbnail = getProductThumbnail(product)
  const images = product.images?.length ? product.images : [{ id: "main", url: thumbnail }]

  const variant = findSelectedVariant(product.variants, selectedOpts, product.options)
  const selectedColor = getSelectedColor(selectedOpts, product.options)
  const matchedImageUrl = variant
    ? findMatchingImage(images, variant, product.options)
    : selectedColor
    ? findImageByColor(images, selectedColor)
    : null
  // Find which image index matches the current color selection for thumbnail highlight
  const matchedIdx = manualImageIdx ?? (matchedImageUrl
    ? images.findIndex((img) => img.url === matchedImageUrl)
    : -1)
  const activeIdx = matchedIdx >= 0 ? matchedIdx : images.length - 1
  const displayImage = manualImageIdx !== null
    ? images[manualImageIdx]?.url
    : matchedImageUrl || thumbnail || images[0]?.url

  const defaultVariant = product.variants[0]
  const price = variant
    ? getVariantPrice(variant)
    : defaultVariant
    ? getVariantPrice(defaultVariant)
    : 0
  const inStock = variant ? variant.inventory_quantity > 0 || !variant.manage_inventory : true

  const allOptionsSelected =
    product.options.length === 0 ||
    product.options.every((opt) => selectedOpts[opt.id])

  const handleAddToCart = async () => {
    if (!allOptionsSelected || !variant || !inStock) return

    setAdding(true)
    try {
      const body: Record<string, any> = {
        variant_id: variant.id,
        quantity,
      }
      if (cartId) body.cart_id = cartId

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error("Failed")

      const json = await res.json()
      if (json.cart?.id) {
        setCartId(json.cart.id)
      }
    } catch {
      alert("Could not add to cart. Please try again.")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-retro-bg">
            <Image
              src={displayImage}
              alt={product.title}
              width={700}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
            {/* CRT corner accents */}
            <div className="absolute left-0 top-0 h-6 w-6 border-r-2 border-b-2 border-neon-cyan/20" />
            <div className="absolute bottom-0 right-0 h-6 w-6 border-l-2 border-t-2 border-neon-cyan/20" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setManualImageIdx(idx)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    idx === activeIdx
                      ? "border-neon-cyan shadow-[0_0_8px_rgba(0,229,255,0.3)]"
                      : "border-retro-border hover:border-neon-cyan/40"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${product.title} ${idx + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="font-pixel text-xl text-gray-800 sm:text-2xl">
            {product.title}
          </h1>

          <p className="mt-5 font-pixel text-2xl text-neon-pink glow-text-pink">
            {formatPrice(price)}
          </p>

          <div className="mt-8">
            <VariantSelector
              options={product.options}
              variants={product.variants}
              selected={selectedOpts}
              onSelect={(optionId, value) =>
                setSelectedOpts((prev) => ({ ...prev, [optionId]: value }))
              }
              images={product.images}
            />
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <QuantityPicker
                value={quantity}
                onChange={setQuantity}
                disabled={!allOptionsSelected || !inStock}
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!allOptionsSelected || !inStock || adding}
              className="btn-primary w-full py-4 font-pixel text-sm"
            >
              {adding
                ? "ADDING..."
                : !inStock
                ? "SOLD OUT"
                : "▶ ADD TO CART"}
            </button>
          </div>

          {product.description && (
            <div className="mt-10 border-t-2 border-retro-border pt-10">
              <h2 className="font-pixel text-xs uppercase text-neon-cyan">
                {"// DESCRIPTION"}
              </h2>
              <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-gray-600">
                {product.description.split("\n").filter(chunk => chunk.trim()).map((chunk, i) => {
                  if (chunk.startsWith("- ")) {
                    return <p key={i} className="pl-3">&bull; {chunk.slice(2)}</p>
                  }
                  if (!chunk.includes(" - ") && chunk.split(" ").length <= 4) {
                    return <p key={i} className="mt-4 font-semibold text-neon-cyan first:mt-0">{chunk}</p>
                  }
                  return <p key={i}>{chunk}</p>
                })}
              </div>
            </div>
          )}

          <div className="mt-10 border-t-2 border-retro-border pt-10">
            <h2 className="font-pixel text-xs uppercase text-neon-cyan">
              {"// SHIPPING & RETURNS"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-neon-cyan">▶</span>
                <span>Free shipping on orders over A$100</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-neon-pink">▶</span>
                <span>Free 30-day returns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-neon-yellow">▶</span>
                <span>Secure checkout with SSL encryption</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function getSelectedColor(
  selected: Record<string, string>,
  options: { id: string; title: string }[]
): string | null {
  const colorOpt = options.find((o) => o.title.toLowerCase() === "color")
  if (!colorOpt) return null
  return selected[colorOpt.id] || null
}

function findImageByColor(images: { url: string }[], color: string): string | null {
  const aliases: Record<string, string[]> = {
    black: ["black", "grey", "gray", "dark", "retro"],
    white: ["white", "whitepng"],
    purple: ["purple", "peuple"],
  }
  const terms = aliases[color.toLowerCase()] || [color.toLowerCase()]
  for (const img of images) {
    const filename = img.url.toLowerCase()
    if (terms.some((t) => filename.includes(t))) {
      return img.url
    }
  }
  return null
}

function findMatchingImage(
  images: { url: string }[],
  variant: ProductVariant,
  options: { id: string; title: string }[]
): string | null {
  // Find the color option value from the variant
  const colorOptId = options.find((o) => o.title.toLowerCase() === "color")?.id
  if (!colorOptId) return null
  
  const colorOpt = variant.options.find((o) => o.option_id === colorOptId)
  if (!colorOpt || !colorOpt.value) return null
  
  const color = colorOpt.value.toLowerCase()
  const aliases: Record<string, string[]> = {
    black: ["black", "grey", "gray", "dark", "retro"],
    white: ["white", "whitepng"],
    purple: ["purple", "peuple"],
  }
  const terms = aliases[color] || [color]
  
  for (const img of images) {
    const filename = img.url.toLowerCase()
    if (terms.some((t) => filename.includes(t))) {
      return img.url
    }
  }
  return null
}

function findSelectedVariant(
  variants: ProductVariant[],
  selected: Record<string, string>,
  options: { id: string }[]
): ProductVariant | null {
  if (options.length === 0) return variants[0] || null

  return (
    variants.find((v) =>
      v.options.every((opt) => selected[opt.option_id] === opt.value)
    ) || null
  )
}
