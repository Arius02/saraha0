/** @type {import('tailwindcss').Config} */

module.exports = {
content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {
      colors:{
        primary: {
          100: "#cff1f0",
          200: "#9fe4e1",
          300: "#70d6d1",
          400: "#40c9c2",
          500: "#10bbb3",
          600: "#0d968f",
          700: "#0a706b",
          800: "#064b48",
          900: "#032524"
      },
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

