"use client"

import useSWR from "swr"
import medusaClient from "@/lib/medusa"
import type { Product, Category, Cart } from "@/lib/types"

function fetcher<T>(url: string): Promise<T> {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error("Fetch failed")
    return res.json()
  })
}

export function useProducts(params?: Record<string, any>) {
  const query = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, String(value))
      }
    })
  }

  const qs = query.toString()
  const url = `/api/products${qs ? `?${qs}` : ""}`

  return useSWR<{ products: Product[]; count: number }>(url, fetcher, {
    revalidateOnFocus: false,
  })
}

export function useProduct(handle: string) {
  return useSWR<{ product: Product }>(
    handle ? `/api/products/${handle}` : null,
    fetcher,
    { revalidateOnFocus: false }
  )
}

export function useCategories() {
  return useSWR<{ categories: Category[] }>("/api/categories", fetcher, {
    revalidateOnFocus: false,
  })
}

export function useCart() {
  const { cartId, setCartId, setItemCount, clearCart } =
    require("@/hooks/use-cart-store").useCartStore()

  const { data, error, mutate } = useSWR<{ cart: Cart }>(
    cartId ? `/api/cart/${cartId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data?.cart) {
          const count = data.cart.items.reduce(
            (sum: number, item: any) => sum + item.quantity,
            0
          )
          setItemCount(count)
        }
      },
      onError: () => {
        clearCart()
      },
    }
  )

  return {
    cart: data?.cart || null,
    isLoading: !data && !error,
    isError: !!error,
    mutate,
  }
}
