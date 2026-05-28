import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        primary: "var(--primary)",
        "brand-primary": "var(--brand-primary)",
        "brand-secondary": "var(--brand-secondary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-accent": "var(--bg-accent)",
        "bg-soft": "var(--bg-soft)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        coral: "var(--coral)",
        highlight: "var(--highlight)",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        jost: ["var(--font-jost)", "sans-serif"],
      },
      borderRadius: {
        'bookzen': '4px', // Refined to a more sharp, minimalist corner
      },
      transitionDuration: {
        '300': '300ms',
      }
    },
  },
  plugins: [],
};
export default config;
