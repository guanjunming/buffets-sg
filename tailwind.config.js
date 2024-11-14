/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: { primary: "#333333" },
      fontSize: {
        "sm-custom": "0.875rem",
        "sm-custom2": "0.75rem",
        "2xl-custom": "1rem",
      },
    },
  },
  plugins: [],
};
