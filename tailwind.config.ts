import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      boxShadow: {
        glow: "0 0 80px rgba(99, 102, 241, 0.35)",
        glass: "0 24px 90px rgba(2, 6, 23, 0.45)"
      },
      keyframes: {
        "aurora-shift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(24px, -20px, 0) scale(1.08)" }
        },
        "grid-fade": {
          "0%, 100%": { opacity: "0.34" },
          "50%": { opacity: "0.16" }
        }
      },
      animation: {
        aurora: "aurora-shift 11s ease-in-out infinite",
        "grid-fade": "grid-fade 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
