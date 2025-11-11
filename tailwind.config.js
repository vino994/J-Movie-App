export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A", // Netflix dark
        secondary: "#E50914", // Netflix red
        accent: "#6BA4FF", // Prime blue
        glass: "rgba(255,255,255,0.08)",
        lightBg: "#F8F9FB",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
