module.exports = {
  plugins: {
    'postcss-nested': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: './renderer/tailwind.config.js',
    },
    autoprefixer: {},
  },
};
