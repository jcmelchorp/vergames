/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';
export default {
  darkMode: ['selector', '[class="app-dark"]'],
  content: ['./projects/yousuck/src/**/*.{html,ts,scss,css}', './projects/yousuck/index.html'],
  plugins: [PrimeUI],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px',
    },
  },
};
