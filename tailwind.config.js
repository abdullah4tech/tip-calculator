/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '375px',
      },
      backgroundColor: {
        'ver-dark-cyan': 'hsl(172, 67%, 45%)',
      }
    },
  },
  plugins: [],
}

