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
          DEFAULT: 'var(--color-primary)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          50: 'var(--color-error-50)',
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
          400: 'var(--color-error-400)',
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
          700: 'var(--color-error-700)',
          800: 'var(--color-error-800)',
          900: 'var(--color-error-900)',
        },
        text: {
          primary: {
            DEFAULT: 'var(--color-text-primary)',
            50: 'var(--color-text-primary-50)',
            100: 'var(--color-text-primary-100)',
            200: 'var(--color-text-primary-200)',
            300: 'var(--color-text-primary-300)',
            400: 'var(--color-text-primary-400)',
            500: 'var(--color-text-primary-500)',
            600: 'var(--color-text-primary-600)',
            700: 'var(--color-text-primary-700)',
            800: 'var(--color-text-primary-800)',
            900: 'var(--color-text-primary-900)',
          },
          secondary: 'var(--color-text-secondary)',
        },
      },
      fontFamily: {
        sans: ['Source\\ Code\\ Pro','mono'],
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
