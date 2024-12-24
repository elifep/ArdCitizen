/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React projeleri için
  ],
  theme: {
    extend: {
      colors: {
        bordo: {
          DEFAULT: '#800000',
          hover: '#a00000',
        },
      },
      backgroundImage: {
        'justice-bg': "url('/src/images/justice-background.jpg')", // Görsel yolunu buraya ekleyin
      },
    },
  },
  plugins: [],
};