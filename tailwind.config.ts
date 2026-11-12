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
        wine: {
          DEFAULT: "#481D2D",
          dark: "#351320",
          light: "#61293E",
        },
        gold: {
          DEFAULT: "#B18A50",
          light: "#C9A874",
          dark: "#8F6D3B",
        },
        champagne: {
          DEFAULT: "#E8D8C3",
          light: "#F2E8DA",
          dark: "#D8C2A6",
        },
        offwhite: {
          DEFAULT: "#FAF7F2",
          pure: "#FFFFFF",
        },
        graphite: {
          DEFAULT: "#241C20",
          muted: "#5A4E53",
          light: "#85787E",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 12px 36px -8px rgba(36, 28, 32, 0.06)",
        card: "0 4px 20px -2px rgba(72, 29, 45, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
