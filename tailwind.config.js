/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      spacing: { "header-height": "3.5rem" },
      colors: {
        theme: {
          red: "hsl(355, 60%, 50%)",
          blue: "hsl(222, 29%, 38%)",
          gray: "hsl(212, 15%, 22%)",
          "gray-light": "hsl(210, 5%, 24%)",
          "gray-dark": "hsl(270, 4%, 9%)",
        },
      },
    },
  },
  plugins: [],
};
