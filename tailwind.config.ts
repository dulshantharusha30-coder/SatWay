import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#E63946', 'secondary': '#F1FAEE', 'dark': '#1D3557',
      },
    },
  },
  plugins: [],
};
export default config;
