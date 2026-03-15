/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#E2D9C9',
        secondary: '#C5C1B4',
        light: {
          100: '#F2C84B',
          200: '#2D5A5E',
          300: '#F8F8F8',
        },
        dark: { // TODO: update colours
          100: '#68605C',
          200: '#463F3D',
        },
        accent: '#2D5A5E'
      }
    },
  },
  plugins: [],
}