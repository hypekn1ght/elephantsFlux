/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-accent': '#5A2A72',
        'secondary-accent': '#F7D9E3',
        'neutral-bg': '#EAE0D1',
      },
    },
  },
  plugins: [],
};
