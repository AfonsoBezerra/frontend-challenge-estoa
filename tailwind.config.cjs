/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans-secondary': '"Rubik Mono One", sans-serif',
      },
      animation: {
        stroke: 'stroke 20s linear infinite',
        'fade-top': 'fade-top 0.2s linear forwards',
      },
      keyframes: {
        stroke: {
          to: { strokeDashoffset: '1000' },
        },
        'fade-top': {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '50%,100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
