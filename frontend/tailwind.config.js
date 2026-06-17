/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0A0A0A',
        'brand-gray': '#1A1A1A',
        'brand-gold': '#D4AF37',
        'brand-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}
