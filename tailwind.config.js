/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'PokeLetra': ['PokeLetra', 'sans-serif'],
        'PokeLetraNegra': ['PokeLetraNegra', 'sans-serif'],
        sans: ['Roboto', 'sans-serif']

      },
    },
  },
  plugins: [],
}