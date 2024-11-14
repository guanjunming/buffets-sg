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
        "sm-custom": "0.875rem", // Example custom size
        "2xl-custom": "1rem",
      },
    },
  },
  plugins: [],
};
