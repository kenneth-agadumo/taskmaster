/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purp: {
          light: "#F1EBFF",
          DEFAULT: "#1fb6ff",
          dark: "#009eeb",
        },
    },
  },
  plugins: [],
}
}
