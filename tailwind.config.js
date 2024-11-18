/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "success-green": "#20CA82",
        "primary-green": "#4BFFB3",
        "secondary-blue": "#4B7DFF",
        "text-white": "#FFFFFF",
        "text-gray": "#D9D9D9",
        "input-gray": "#808080",
        "card-gray": "#545454",
        "background-gray": "#3D3D3D",
        "almost-black": "#222222",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
