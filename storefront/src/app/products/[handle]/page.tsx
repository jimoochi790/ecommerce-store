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
  const [activeImageIdx, setActiveImageIdx] = useState(0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <p className="text-lg font-medium text-neutral-900">Product not found</p>
      </div>
    )
  }

  const thumbnail = getProductThumbnail(product)
  const images = product.images?.length ? product.images : [{ id: "main", url: thumbnail }]
  const displayImage = images[activeImageIdx]?.url || images[0]?.url || thumbnail

  const variant = findSelectedVariant(product.variants, selectedOpts, product.options)
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
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={displayImage}
              alt={product.title}
              width={700}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    idx === activeImageIdx
                      ? "border-neutral-900"
                      : "border-transparent hover:border-neutral-300"
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

        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-bold text-neutral-900">
            {product.title}
          </h1>

          <p className="mt-5 text-2xl font-semibold text-neutral-900">
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
              className="btn-primary w-full py-4 text-base"
            >
              {adding
                ? "Adding..."
                : !inStock
                ? "Out of Stock"
                : "Add to Cart"}
            </button>
          </div>

          {product.description && (
            <div className="mt-10 border-t border-neutral-200 pt-10">
              <h2 className="text-sm font-medium text-neutral-900">
                Description
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-600">
                {product.description.split("\n").map((chunk, i) => (
                  <p key={i}>{chunk}</p>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 border-t border-neutral-200 pt-10">
            <h2 className="text-sm font-medium text-neutral-900">
              Shipping &amp; Returns
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-neutral-500">
              <li className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span>Free shipping on orders over $100</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                </svg>
                <span>Free 30-day returns</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>Secure checkout with SSL encryption</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
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
