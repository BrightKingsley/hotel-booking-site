/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: { fontFamily: ["Poppins"] },
    extend: {
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(185.44deg, rgb(251 146 60 / 1) 13.21%,  rgb(234 88 12 / 1) 95.65%)",
        "gradient-primary-radial":
          "radial-gradient(185.44deg, rgb(251 146 60 / 1) 13.21%,  rgb(234 88 12 / 1) 95.65%)",
      },
      animation: "wobble",
      colors: {
        primary: "rgb(251 146 60 / 1)",
        body: "white",
        accent: "rgb(74 222 128 / 1)",
        grey: "rgb(242 242 242 / 1)",
      },
      content: {},
      fontFamily: {
        sans: [
          // "Cubano",
          "Inter",
          "poppins",
          "system-ui",
          "-apple-system",
          "Ubuntu",
          "Oxygen",
          "sans-serif",
        ],
        cubano: ["Cubano"],
      },
      // screens: {
      //   sm: "576px",
      //   md: "768px",
      //   lg: "992px",
      //   xl: "1220px",
      //   xxl: "1400px",
      //   navsm: "560px",
      // },
    },
  },
  plugins: [],
};
