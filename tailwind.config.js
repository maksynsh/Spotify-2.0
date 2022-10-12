/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'transparent': 'transparent',
        'dark': '#181818',
        'black': '#040306',
        'green': '#1db954',
        'gray': '#a0a0a0',
        'white': '#fff'
      },
    },
    
  },
  plugins: [],
}
