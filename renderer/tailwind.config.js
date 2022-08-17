const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub')

/**@type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  important: false,
  darkMode: true,
  theme: {
    extend: {
      boxShadow: {
        strong: '0 25px 50px -12px rgb(0 0 0 / 1)',
        float: '0 0 5rem 0.25rem #000',
      },
      colors: {
        primary: {
          DEFAULT: '#555555',
          50: '#DADADA',
          100: '#CFCFCF',
          200: '#BBBBBB',
          300: '#A7A7A7',
          400: '#929292',
          500: '#7E7E7E',
          600: '#696969',
          700: '#555555',
          800: '#393939',
          900: '#1D1D1D',
        },
        secondary: {
          DEFAULT: '#BCE0FD',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#DFEFFE',
          300: '#BCE0FD',
          400: '#86CBFB',
          500: '#4FBAFA',
          600: '#19ACF8',
          700: '#0694D2',
          800: '#05739C',
          900: '#034E65',
        },
        error: {
          DEFAULT: '#FF5151',
          50: '#FFB7B7',
          100: '#FFA3A3',
          200: '#FF7A7A',
          300: '#FF5151',
          400: '#FF1919',
          500: '#E00000',
          600: '#A80000',
          700: '#700000',
          800: '#370000',
          900: '#000000',
        },
        text: {
          primary: {
            DEFAULT: '#DDDDDD',
            50: '#FFFFFF',
            100: '#FFFFFF',
            200: '#F1F1F1',
            300: '#DDDDDD',
            400: '#C1C1C1',
            500: '#A5A5A5',
            600: '#898989',
            700: '#6D6D6D',
            800: '#515151',
            900: '#353535',
          },
          secondary: '#BCE0FE',
        },
      },
      fontFamily: {
        sans: ['Source\\ Code\\ Pro'],
      },
      fontSize: {
        '2xs': '0.65rem',
        '2xll': '1.75rem',
      },
    },
    screens: {
      sm: `${640 / 16}rem`, // sm: '640px',
      md: `${768 / 16}rem`, // md: '768px',
      lg: `${1024 / 16}rem`, // lg: '1024px',
      xl: `${1280 / 16}rem`, // xl: '1280px',
      '2xl': `${1536 / 16}rem`, // '2xl': '1536px',
      '4xl': `${2560 / 16}rem`, // '4xl': '2560px',
    },
  },
  variants: {
    extend: {},
  },

  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
    './renderer/styles/**/*.{scss,sass,css}',
  ],
  plugins: [require('tailwindcss-children')],
}
