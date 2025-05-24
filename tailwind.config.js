// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',  // primary blue (e.g., Tailwind blue-600)
        // ... add other custom colors or overrides as needed
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'sans-serif'], // elegant base font
      }
      // (We can also define breakpoints, spacing, etc., if Valnia prescribes any)
    }
  },
  darkMode: 'class',  // enable class-based dark mode
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
} 