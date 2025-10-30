/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class', // enables dark mode via `.dark` class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Light theme colors
        light: {
        
          primaryButton : "#1055C9",
          primaryButtonHover : "#05339C"

        },
        // 🌑 Dark theme colors
        dark: {
          
        },
      },
    },
  },
  plugins: [],
}
