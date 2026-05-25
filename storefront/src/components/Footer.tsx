import Link from "next/link"

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products?sort=created_at" },
      { label: "Best Sellers", href: "/products?sort=price_desc" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="border-t-2 border-retro-border bg-retro-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-pixel text-sm text-neon-cyan glow-text">
              {"< RETRO//ARCADE />"}
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Premium retro gaming handhelds and gear. Bringing pixel-perfect nostalgia to your pocket.
            </p>
          </div>
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-pixel text-xs uppercase text-neon-pink glow-text-pink">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-neon-cyan"
                    >
                      {">"} {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t-2 border-retro-border pt-6">
          <p className="text-center font-pixel text-[10px] text-gray-600">
            &copy; {new Date().getFullYear()} RETRO//ARCADE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
