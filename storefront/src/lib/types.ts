export interface ProductImage {
  id: string
  url: string
  created_at: string
  updated_at: string
}

export interface ProductOptionValue {
  id: string
  value: string
  option_id: string
  variant_id: string
}

export interface ProductOption {
  id: string
  title: string
  product_id: string
  values: ProductOptionValue[]
}

export interface ProductVariant {
  id: string
  title: string
  product_id: string
  sku: string | null
  prices: { id: string; currency_code: string; amount: number }[]
  inventory_quantity: number
  manage_inventory: boolean
  allow_backorder: boolean
  options: ProductOptionValue[]
}

export interface Product {
  id: string
  title: string
  handle: string | null
  description: string | null
  subtitle: string | null
  thumbnail: string | null
  images: ProductImage[]
  options: ProductOption[]
  variants: ProductVariant[]
  tags: { id: string; value: string }[]
  collection: { id: string; title: string } | null
  collection_id: string | null
  categories: { id: string; name: string; handle: string }[]
  created_at: string
  updated_at: string
}

export interface LineItem {
  id: string
  title: string
  description: string | null
  thumbnail: string | null
  unit_price: number
  quantity: number
  variant: {
    id: string
    title: string
    sku: string | null
    product_id: string
    options: ProductOptionValue[]
  }
}

export interface Cart {
  id: string
  email: string | null
  region: {
    id: string
    name: string
    currency_code: string
    tax_rate: number
  }
  items: LineItem[]
  subtotal: number
  shipping_total: number
  tax_total: number | null
  total: number
  discount_total: number
  gift_card_total: number
  shipping_methods: any[]
  payment_sessions: any[]
  payment_session: any | null
}

export interface CartCompletionResponse {
  type: "order" | "swap"
  data: any
}

export interface Category {
  id: string
  name: string
  handle: string
  description: string
}

export type SORT_OPTION = "created_at" | "price_asc" | "price_desc" | "title_asc" | "title_desc"
