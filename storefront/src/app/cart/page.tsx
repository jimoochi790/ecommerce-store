"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-data"
import { formatPrice } from "@/lib/utils"
import QuantityPicker from "@/components/QuantityPicker"

export default function CartPage() {
  const { cart, isLoading, mutate } = useCart()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleQuantityChange = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return
      setUpdating(lineId)
      try {
        const res = await fetch(`/api/cart/${cart.id}/items`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ line_id: lineId, quantity }),
        })
        if (res.ok) {
          mutate()
        }
      } catch {
        // ignore
      } finally {
        setUpdating(null)
      }
    },
    [cart, mutate]
  )

  const handleRemove = useCallback(
    async (lineId: string) => {
      if (!cart) return
      setUpdating(lineId)
      try {
        const res = await fetch(`/api/cart/${cart.id}/items`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ line_id: lineId }),
        })
        if (res.ok) {
          mutate()
        }
      } catch {
        // ignore
      } finally {
        setUpdating(null)
      }
    },
    [cart, mutate]
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <svg className="h-16 w-16 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <h1 className="mt-6 text-2xl font-bold text-neutral-900">Your cart is empty</h1>
          <p className="mt-2 text-neutral-500">Add some products to get started.</p>
          <Link href="/products" className="btn-primary mt-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
        Shopping Cart
      </h1>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-neutral-200">
            {cart.items.map((item) => (
              <li key={item.id} className="flex gap-6 py-6">
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between gap-4">
                      <h3 className="text-base font-medium text-neutral-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-base font-semibold text-neutral-900 whitespace-nowrap">
                        {formatPrice(item.unit_price * item.quantity)}
                      </p>
                    </div>
                    {item.variant?.options?.length > 0 && (
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.variant.options.map((o) => o.value).join(" / ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatPrice(item.unit_price)} each
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <QuantityPicker
                      value={item.quantity}
                      onChange={(qty) => handleQuantityChange(item.id, qty)}
                      disabled={updating === item.id}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      disabled={updating === item.id}
                      className="btn-ghost text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      {updating === item.id ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-red-600" />
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 lg:col-span-4 lg:mt-0">
          <div className="card sticky top-28 p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Order Summary
            </h2>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-600">Subtotal</dt>
                <dd className="font-medium text-neutral-900">
                  {formatPrice(cart.subtotal)}
                </dd>
              </div>
              {(cart.shipping_total ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Shipping</dt>
                  <dd className="font-medium text-neutral-900">
                    {formatPrice(cart.shipping_total)}
                  </dd>
                </div>
              )}
              {(cart.tax_total ?? 0) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Tax</dt>
                  <dd className="font-medium text-neutral-900">
                    {formatPrice(cart.tax_total ?? 0)}
                  </dd>
                </div>
              )}
              {cart.discount_total > 0 && (
                <div className="flex justify-between text-accent-600">
                  <dt>Discount</dt>
                  <dd className="font-medium">
                    -{formatPrice(cart.discount_total)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between border-t border-neutral-200 pt-3 text-base">
                <dt className="font-semibold text-neutral-900">Total</dt>
                <dd className="font-semibold text-neutral-900">
                  {formatPrice(cart.total)}
                </dd>
              </div>
            </dl>

            <Link href="/checkout" className="btn-primary mt-6 w-full py-4 text-base">
              Proceed to Checkout
            </Link>

            <Link href="/products" className="btn-ghost mt-3 w-full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
