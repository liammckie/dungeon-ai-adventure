import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        parchment: {
          light: "#f4e4bc",
          DEFAULT: "#e4d5b7",
          dark: "#d4c5a7",
        },
        fantasy: {
          primary: "#8b0000",
          secondary: "#2b4b2b",
          accent: "#644e1b",
          warrior: "#0ea5e9",
          mage: "#f97316",
          rogue: "#8b5cf6",
          cleric: "#eab308",
          frame: {
            border: "#8b7355",
            glow: "rgba(255, 215, 0, 0.15)",
          },
        },
      },
      keyframes: {
        "torch-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "frame-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(255, 215, 0, 0.5)" },
        },
      },
      animation: {
        "torch-flicker": "torch-flicker 3s ease-in-out infinite",
        "frame-glow": "frame-glow 4s ease-in-out infinite",
      },
      backgroundImage: {
        "parchment-texture": "url('/parchment-bg.png')",
        "character-frame": "url('/lovable-uploads/ac38a970-80e0-4c0a-b454-c88efe29cef4.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;