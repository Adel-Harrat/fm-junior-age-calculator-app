/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tw-purple": "hsl(259, 100%, 65%)",
        "tw-red": "hsl(0, 100%, 67%)",
        "tw-white": "hsl(0, 0%, 100%)",
        "tw-off-white": "hsl(0, 0%, 94%)",
        "tw-light-grey": "hsl(0, 0%, 86%)",
        "tw-smokey-grey": "hsl(0, 1%, 44%)",
        "tw-black": "hsl(0, 0%, 8%)",
      },
    },
  },
  plugins: [],
};
