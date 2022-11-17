/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      colors: {
        'transparent': 'transparent',
        'dark': '#181818',
        'dragonstone': '#121212',
        'black': '#040306',
        'green': '#1db954',
        'gray': '#a0a0a0',
        'carbon': '#3d3d3d',
        'white': '#fff'
      },
    },
    
  },
  plugins: [],
}
