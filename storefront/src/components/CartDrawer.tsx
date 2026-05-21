"use client"

import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/hooks/use-cart-store"
import { useCart } from "@/hooks/use-data"
import { formatPrice, cn } from "@/lib/utils"

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen)
  const closeCart = useCartStore((s) => s.closeCart)
  const { cart, isLoading } = useCart()

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-400",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-5">
          <h2 className="text-lg font-semibold text-neutral-900">Cart</h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
            </div>
          )}

          {!isLoading && (!cart || cart.items.length === 0) && (
            <div className="flex flex-col items-center justify-center py-20">
              <svg className="h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className="mt-4 text-sm text-neutral-500">Your cart is empty</p>
            </div>
          )}

          {!isLoading && cart && cart.items.length > 0 && (
            <ul className="divide-y divide-neutral-200">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <p className="text-sm font-medium text-neutral-900 line-clamp-1">
                        {item.title}
                      </p>
                      {item.variant?.options?.length > 0 && (
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {item.variant.options.map((o) => o.value).join(" / ")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Qty {item.quantity}</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        {formatPrice(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="border-t border-neutral-200 px-4 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-700">Subtotal</span>
              <span className="text-sm font-semibold text-neutral-900">
                {formatPrice(cart.subtotal)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary mb-2 w-full"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-secondary w-full"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
