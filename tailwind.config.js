/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,tsx}"],
  theme: {
    extend: {
      spacing: { header: "4rem" },
      colors: {
        theme: {
          red: "hsl(355, 60%, 50%)",
          blue: "hsl(222, 29%, 38%)",
        },
      },
      fontFamily: { poppins: "Poppins, sans-serif" },
    },
  },
  plugins: [],
};
