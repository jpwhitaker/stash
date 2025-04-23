/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#FFFEF2',
        'search-bg': '#7A7261',
        'search-text': '#FFFEF2',
        'text': '#333333',
        'results-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
} 