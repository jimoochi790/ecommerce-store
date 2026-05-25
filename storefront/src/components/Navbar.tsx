"use client"

import { useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/hooks/use-cart-store"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Contact", href: "mailto:support@retroarcade.com.au", external: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount)
  const openCart = useCartStore((s) => s.openCart)

  return (
    <header className="sticky top-0 z-40 border-b-2 border-retro-border bg-retro-bg/95 backdrop-blur supports-[backdrop-filter]:bg-retro-bg/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-pixel text-lg text-neon-cyan glow-text"
          >
            {"< RETRO//ARCADE />"}
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="btn-ghost"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="btn-ghost"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            className="btn-ghost relative"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center bg-neon-pink px-1 font-pixel text-[10px] text-white shadow-[0_0_8px_rgba(255,45,149,0.6)]">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn-ghost md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t-2 border-retro-border bg-retro-surface md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2.5 font-pixel text-sm uppercase text-gray-300 transition-colors hover:bg-retro-card hover:text-neon-cyan"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 font-pixel text-sm uppercase text-gray-300 transition-colors hover:bg-retro-card hover:text-neon-cyan"
                >
                  {link.label}
                </Link>
              )
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                openCart()
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 font-pixel text-sm uppercase text-gray-300 transition-colors hover:bg-retro-card hover:text-neon-cyan"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
