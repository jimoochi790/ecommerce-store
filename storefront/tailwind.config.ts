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
        retro: {
          bg: "#1a1a2e",
          surface: "#22223a",
          card: "#2a2a44",
          border: "#3a3a5a",
          muted: "#7a7a9a",
        },
        neon: {
          cyan: "#00e5ff",
          pink: "#ff2d95",
          yellow: "#ffd700",
          green: "#39ff14",
          purple: "#b44dff",
        },
        aussie: {
          red: "#ff2436",
          blue: "#0055c4",
          navy: "#0a1545",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
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
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0,229,255,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.3)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
