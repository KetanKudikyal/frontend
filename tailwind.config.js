/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './node_modules/@heathmont/moon-core-tw/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [require('prettier-plugin-tailwindcss'), require('@heathmont/moon-core-tw/lib/private/presets/ds-moon-preset')],
}

