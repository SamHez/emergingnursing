/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}", "./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B2D36",
        teal: {
          50: "#F1FCFB",
          100: "#D6F7F3",
          200: "#A7ECE6",
          300: "#74DED8",
          400: "#38C8C2",
          500: "#18B8B0",
          600: "#10958F",
          700: "#0D7270",
          800: "#0B575A",
          900: "#0A434A",
        },
        mint: {
          100: "#EAF8E4",
          200: "#D5F0CC",
          300: "#B4E49E",
          400: "#8FD67B",
          500: "#74C96C",
          600: "#5EAE58",
        },
        sky: {
          100: "#EAF7FE",
          200: "#C8EAFE",
          300: "#99DAFB",
          400: "#52C0F1",
          500: "#38B6EC",
          600: "#2497CF",
        },
        cream: "#F6F1E8",
        sand: "#EBE3D7",
      },
      fontFamily: {
        sans: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(11, 45, 54, 0.08)",
        glass: "0 18px 40px rgba(14, 114, 112, 0.16)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(56, 182, 236, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(116, 201, 108, 0.2), transparent 35%)",
        "mesh-gradient":
          "linear-gradient(135deg, rgba(24, 184, 176, 0.16), rgba(56, 182, 236, 0.08) 40%, rgba(116, 201, 108, 0.12) 100%)",
      },
    },
  },
  plugins: [],
};
