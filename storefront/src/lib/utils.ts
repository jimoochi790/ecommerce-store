import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: string = "AUD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

export function getProductThumbnail(product: { thumbnail?: string | null; images?: { url: string }[] }): string {
  if (product.thumbnail) return product.thumbnail
  if (product.images && product.images.length > 0) return product.images[0].url
  return "/placeholder.svg"
}

export function getVariantPrice(
  variant: { prices?: { amount: number; currency_code: string }[] },
  currencyCode: string = "aud"
): number {
  if (!variant.prices || variant.prices.length === 0) return 0
  const price = variant.prices.find((p) => p.currency_code === currencyCode)
  return price ? price.amount : variant.prices[0].amount
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
