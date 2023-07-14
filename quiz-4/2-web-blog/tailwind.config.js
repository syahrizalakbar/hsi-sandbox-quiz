/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        'image': '4 / 2.5',
      },
      colors: {
        primary: "#FF5480"
      }
    },
  },
  plugins: [],
}
