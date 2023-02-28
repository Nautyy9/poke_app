/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens : {
      'xs': '450px',
      'sm': '640px',
      'md': '768px',
      'md+': '900px',
      'lg': '1024px',
      'lg+': '1156px',
      'xl': '1320px',
      '2xl': '1536px',
      '3xl': '1700px',
      '4xl': '1780px',
      '5xl': '1880px'
    },
    extend: {},
  },
  plugins: [],
}
