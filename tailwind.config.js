/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html", "./**/*.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#165DFF",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
          DEFAULT: "#165DFF",
        },
        secondary: "#6B7280",
        accent: "#FF7D00",
        light: "#F3F4F6",
        dark: "#1F2937",
        success: "#00B42A",
        warning: "#FF7D00",
        danger: "#F53F3F",
        "notion-gray": "#f7f6f3",
        "notion-text": "#37352f",
        "notion-light-gray": "#ebeced",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
