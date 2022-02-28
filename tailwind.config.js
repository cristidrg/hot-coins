module.exports = {
  important: false,
  purge: {
    content: [
      './modules/**/*.{vue,js}',
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightgrey: '#f2f2f2',
        grey: '#8f97a3',
        aqua: '#45dcd2',
        lobster: '#ff6450',
        white: '#ffffff',
        darkaquamarine: '#2e314d',
        transparentgray: '#0000000d',
      },
      ringWidth: ['hover', 'active'],
    },
  },
}
