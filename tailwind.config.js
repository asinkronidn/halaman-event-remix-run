/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'purple': '#4126b2',
      'gray-dark': '#15171a',
      'gray': '#979797',
      'gray-light': '#979797',
      'gray-lighter': '#fcfcfc',
      'white': '#ffffff',
      'red-alert': '#FF0000'
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    }
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
  },
  plugins: [],
}

