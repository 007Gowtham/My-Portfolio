// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['var(--font-dancing)', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
