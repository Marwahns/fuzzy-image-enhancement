/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',
    './**/*.{html,js}',
    './templates/**/*/*.html'
  ],
    theme: {
      extend: {
      },
    },
    plugins: [
      require('flowbite/plugin')
  ]
}

