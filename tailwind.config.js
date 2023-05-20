const headerH = "3rem";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,tsx}"],
  theme: {
    extend: {
      minHeight: { "screen-header": `calc(100vh - ${headerH})` },
      spacing: { header: headerH },
      colors: {
        theme: {
          red: "hsl(355, 60%, 50%)",
          blue: "hsl(222, 29%, 38%)",
          gray: "hsl(212, 15%, 22%)",
          "gray-light": "hsl(210, 5%, 24%)",
          "gray-dark": "hsl(270, 4%, 9%)",
        },
      },
      fontFamily: { poppins: "Poppins, sans-serif" },
    },
  },
  plugins: [],
};
