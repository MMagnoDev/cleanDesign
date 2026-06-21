/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        // Custom breakpoints beyond Tailwind defaults
        "xs": "480px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "3xl": "1800px"
      },
      colors: {
        gold: "#c5a880",
        "gold-dark": "#b3956d"
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Outfit'", "-apple-system", "sans-serif"],
        mono: ["'Geist Mono'", "monospace"]
      }
    }
  },
  plugins: []
};
