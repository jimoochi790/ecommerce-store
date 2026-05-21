"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartState {
  cartId: string | null
  itemCount: number
  isOpen: boolean
  setCartId: (id: string | null) => void
  setItemCount: (count: number) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      itemCount: 0,
      isOpen: false,
      setCartId: (id) => set({ cartId: id }),
      setItemCount: (count) => set({ itemCount: count }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ cartId: null, itemCount: 0 }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartId: state.cartId, itemCount: state.itemCount }),
    }
  )
)
