/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#3B5A2B',      // Forest Green
          gold: '#997D2F',       // Muted Gold
          alabaster: '#F9F8F6',  // Off-white/Alabaster
          cream: '#F4F1EA',      // Soft Cream
          dark: '#1A2416',       // Warm dark slate for text readability
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
