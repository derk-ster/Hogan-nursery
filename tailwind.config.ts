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
        cream: "#FAF6F0",
        sand: "#F0E8DC",
        tan: "#E8DFD2",
        clay: "#C4845C",
        terracotta: "#B86B4A",
        olive: "#4A5D3A",
        "olive-dark": "#3A4A2E",
        leaf: "#6B8F5E",
        charcoal: "#2C2C2A",
        brown: "#8B7355",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        warm: "0 4px 24px rgba(196, 132, 92, 0.15)",
        glow: "0 0 40px rgba(255, 200, 120, 0.35)",
        "cta-glow": "0 0 30px rgba(74, 93, 58, 0.4)",
        card: "0 2px 12px rgba(44, 44, 42, 0.08)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        glow: "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "leaf-sway": "leaf-sway 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
