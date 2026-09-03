import type { Config } from "tailwindcss";

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
          ivory: "#F7F3EC",
          ink: "#17201E",
          "deep-green": "#24483F",
          terracotta: "#C66E45",
          sage: "#9DB6A9",
          "warm-stone": "#DDD6CB",
          // Variations for soft backgrounds & borders
          "ivory-light": "#FAF7F2",
          "ivory-dark": "#EFE9DE",
          "ink-muted": "#32403C",
          "ink-light": "#61736E",
          "deep-green-dark": "#1B3730",
          "deep-green-light": "#2E5B50",
          "terracotta-dark": "#A85834",
          "terracotta-light": "#DE875F",
          "terracotta-subtle": "rgba(198, 110, 69, 0.12)",
          "sage-light": "#C3D4CB",
          "sage-subtle": "rgba(157, 182, 169, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Satoshi", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        serif: ["var(--font-lora)", "Lora", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(23, 32, 30, 0.06)",
        card: "0 10px 30px -4px rgba(23, 32, 30, 0.08)",
        elevated: "0 20px 40px -6px rgba(23, 32, 30, 0.12)",
        glow: "0 0 25px rgba(198, 110, 69, 0.25)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
