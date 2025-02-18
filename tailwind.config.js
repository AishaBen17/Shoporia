/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    
    },
    extend: {
      colors: {
        primary: {
          100: "#e3cde0",
          200: "#d1afce",
          300: "#bf91bc",
          400: "#ae73aa",
          500: "#8A4F7D",  // Base Color
          600: "#6d3f63",
          700: "#512f49",
        },
        secondary: {
          100: "#f5f5f5",
          200: "#e8e8e8",
          300: "#d9d9d9",
          400: "#cccccc",
          500: "#b3b3b3",
          600: "#999999",
        },
        danger: {
          100: "#f9d5d9",
          200: "#f7c3c7",
          300: "#f5b1b5",
          400: "#f39e9f",
          500: "#ec787a",
          600: "#db5054",
          700: "#ca2b2f",
        },
        
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
