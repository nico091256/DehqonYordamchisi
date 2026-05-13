import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        outfit: ["var(--font-outfit)"],
      },
      colors: {
        primary: "#2D5A27",
        secondary: "#E67E22",
        accent: "#F1C40F",
      },
    },
  },
  plugins: [],
};
export default config;
