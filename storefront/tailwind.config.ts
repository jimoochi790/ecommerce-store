import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0f5",
          100: "#d9d5e2",
          200: "#beb6cc",
          300: "#a393b4",
          400: "#8a739f",
          500: "#725787",
          600: "#5b436e",
          700: "#443155",
          800: "#2f213d",
          900: "#1c1128",
          950: "#0f0816",
        },
        accent: {
          50: "#fff1f0",
          100: "#ffd9d6",
          200: "#ffbab4",
          300: "#ff968b",
          400: "#ff6d5e",
          500: "#ff4432",
          600: "#e62917",
          700: "#b81d0f",
          800: "#8a150b",
          900: "#5c0e07",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-right": "slideRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
