/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['open sans', 'sans-serif'],
      },
      colors: {
        primary: '#51282b',
        secondary: '#fec700',
        accent: '#fdd94c',
        background: '#f6f4f4',
      },
    },
  },
  plugins: [],
};
