// tailwind.config.js
import { nextui } from "@nextui-org/react";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'md:ml-20',
    'md:ml-64'
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware glass colors
        'glass': {
          'primary': 'rgb(var(--glass-primary))',
          'secondary': 'rgb(var(--glass-secondary))',
          'muted': 'rgb(var(--glass-muted))',
          'surface': 'rgba(var(--glass-surface))',
          'border': 'rgba(var(--glass-border))',
          'hover': 'rgba(var(--glass-hover))',
        },
        // Theme-aware backgrounds
        'base': {
          'primary': 'rgb(var(--base-primary))',
          'secondary': 'rgb(var(--base-secondary))',
          'elevated': 'rgb(var(--base-elevated))',
          'subtle': 'rgb(var(--base-subtle))',
        },
        // Accent colors (same for both themes)
        'accent': {
          'primary': '#6366F1',    // Indigo
          'secondary': '#8B5CF6',  // Purple
          'tertiary': '#EC4899',   // Pink
          'success': '#10B981',    // Emerald
          'warning': '#F59E0B',    // Amber
          'error': '#EF4444',      // Red
        },
        'dark': {
          'base': '#0A0A0F',         // Near black with blue tint
          'elevated': '#131318',      // Slightly lighter for cards
          'subtle': '#1A1A24',        // For subtle backgrounds
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(99, 102, 241, 0.15)',
        'glow-md': '0 0 40px rgba(99, 102, 241, 0.2)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [tailwindcssAnimate, nextui()],
};

export default config; 