/** @type {import('tailwindcss').Config} */
const tailwindColors = require("./node_modules/tailwindcss/colors")

const extendedColors = {
  'transparent': 'transparent',
  'dark': '#181818',
  'dragonstone': '#121212',
  'black': '#040306',
  'green': '#1db954',
  'gray': '#a0a0a0',
  'carbon': '#3d3d3d',
  'white': '#fff'
}
const colorSafeList = []

const deprecated = ["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray"]

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  const pallette = tailwindColors[colorName]

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`bg-${colorName}-${shade}`)
      }
    })
  }
}

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: colorSafeList,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      colors: extendedColors,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
