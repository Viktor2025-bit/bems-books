import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Bookzen inspired colors to be added here
        primary: "#181818",
        highlight: "#8BBD65",
      },
      fontFamily: {
        jost: ["var(--font-jost)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
