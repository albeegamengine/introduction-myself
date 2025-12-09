import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#0ea5e9",
        text: "#1e293b",
        background: "#ffffff",
        surface: "#f8fafc",
      },
      screens: {
        mobile: "0px",
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};

export default config;
