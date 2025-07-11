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
        // Dynamic dark mode colors that change with theme
        'dark': {
          'base': 'rgb(var(--base-primary))',
          'elevated': 'rgb(var(--base-elevated))',
          'subtle': 'rgb(var(--base-subtle))',
        },
        // Core brand colors (same for both themes)
        'primary': {
          DEFAULT: '#6366F1',
          foreground: '#FFFFFF',
          50: '#F0F1FF',
          100: '#E0E2FE',
          200: '#C7CAFD',
          300: '#A5ACFB',
          400: '#8B8FF9',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        'secondary': {
          DEFAULT: '#8B5CF6',
          foreground: '#FFFFFF',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        'accent': {
          DEFAULT: '#EC4899',
          'primary': '#6366F1',    
          'secondary': '#8B5CF6',  
          'tertiary': '#EC4899',   
          'success': '#10B981',    
          'warning': '#F59E0B',    
          'error': '#EF4444',      
        },
        // Semantic colors (theme aware)
        background: 'rgb(var(--base-primary))',
        foreground: 'rgb(var(--glass-primary))',
        card: 'rgba(var(--glass-surface))',
        'card-foreground': 'rgb(var(--glass-primary))',
        popover: 'rgb(var(--base-elevated))',
        'popover-foreground': 'rgb(var(--glass-primary))',
        muted: 'rgb(var(--base-subtle))',
        'muted-foreground': 'rgb(var(--glass-muted))',
        border: 'rgba(var(--glass-border))',
        input: 'rgb(var(--base-elevated))',
        ring: '#6366F1',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(99, 102, 241, 0.15)',
        'glow-md': '0 0 40px rgba(99, 102, 241, 0.2)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'shadow-glow': '0 0 40px rgba(99, 102, 241, 0.2)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
        'glass': '1rem',
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