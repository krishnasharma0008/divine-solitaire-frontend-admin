/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line for date picker
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        Lbgimg: "url('/Rectangle32.png')",
      },
      colors: {
        "Chinese-Black-sidebar": "#161616",
        "light-white": "#FFFFFF",
        tomato: "#FF5757",
        "custom-grey": "#1e1e1e",
        snow: "#F9F9F9",
        green : "#00AC00",
        "Inactive" : "#B3B3B3",
      },
      backgroundColor: {
        "light-muted-azure": "#5599FF",
        "custom-grey": "#1e1e1e",
      },
    },
    fontFamily: {
      body: ['"Montserrat"', '"Open Sans"'],
    },
  },
  plugins: [],
};
