/** @type {import('tailwindcss').Config} */
export default {
  // prefix: "tw-", // <<< Very important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
