import type { Metadata } from "next"
import { Inter, Press_Start_2P } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CartProvider from "@/components/CartProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
})

export const metadata: Metadata = {
  title: {
    default: "RETRO//ARCADE",
    template: "%s | RETRO//ARCADE",
  },
  description: "Premium retro gaming handhelds and gear.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
