/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage:{
        'testImg': "url(./public/test.jpg)"
      }
    },
  },
  plugins: [],
}