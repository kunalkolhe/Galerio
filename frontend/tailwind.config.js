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
          black: '#050505',
          gold: '#EC4899', // Reusing the 'gold' variable name but making it vibrant pink
          white: '#ffffff',
          gray: '#1f2937'
        }
      },
    },
  },
  plugins: [],
}
