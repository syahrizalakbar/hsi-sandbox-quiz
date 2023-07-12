/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A3AFF',
          50: '#F3F2FF',
          100: '#E0DDFF',
          200: '#BAB4FF',
          300: '#958CFF',
          400: '#6F63FF',
          500: '#4A3AFF',
          600: '#1602FF',
          700: '#1000C9',
          800: '#0C0091',
          900: '#070059',
          950: '#05003D'
        }
      },
      boxShadow: {
        primary: "0px 3px 12px rgba(74, 58, 255, 0.18)"
      }
    },
    fontFamily: {
      sans: ["DM Sans"]
    },
  },
  plugins: [],
}
