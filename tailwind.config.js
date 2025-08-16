/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Tailwind blue-500 as example
          foreground: "#ffffff", // text color on primary
        },
        background: {
          DEFAULT: "#f9fafb", // light gray background
          foreground: "#111827", // text color on background
        },
        foreground: {
          DEFAULT: "#111827", // main text
          muted: "#6b7280", // secondary text
        },
      },
    },
  },
  plugins: [],
};
