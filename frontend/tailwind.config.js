/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0C',
        'surface-1': '#0F0F12',
        'surface-2': '#16161A',
        'surface-3': '#1C1C21',
        primary: '#E8E8E6',
        secondary: '#8A8A92',
        accent: {
          DEFAULT: '#D97706',
          glow: 'rgba(217, 119, 6, 0.2)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '40px',
        'hero': ['clamp(4rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}
