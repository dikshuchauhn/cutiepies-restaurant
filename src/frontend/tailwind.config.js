/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        burgundy: {
          DEFAULT: "oklch(var(--burgundy) / <alpha-value>)",
          dark: "oklch(var(--burgundy-dark) / <alpha-value>)",
          light: "oklch(var(--burgundy-light) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "oklch(var(--gold) / <alpha-value>)",
          light: "oklch(var(--gold-light) / <alpha-value>)",
        },
        cream: {
          DEFAULT: "oklch(var(--cream) / <alpha-value>)",
          dark: "oklch(var(--cream-dark) / <alpha-value>)",
        },
        "dark-brown": "oklch(var(--dark-brown) / <alpha-value>)",
        "warm-gray": "oklch(var(--warm-gray) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["General Sans", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        warm: "0 4px 20px -4px oklch(0.38 0.18 8 / 0.15)",
        "warm-lg": "0 8px 40px -8px oklch(0.38 0.18 8 / 0.20)",
        card: "0 2px 12px oklch(0.38 0.18 8 / 0.08)",
        gold: "0 4px 20px -4px oklch(0.72 0.13 72 / 0.30)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
