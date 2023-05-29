/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    // Add more paths to include CSS classes from other files if needed
  ],
  theme: {
    extend: {
      // Add custom theme configurations here
      // For example, to add a new color:
      colors: {
        primary: '#329a9a',
      },
    },
  },
  variants: {
    extend: {
      // Add additional variants to existing utilities or define your own variants
      opacity: ['disabled'],
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here
    // For example, to enable the aspect-ratio plugin:
    require('@tailwindcss/aspect-ratio'),
    // Add more plugins as needed
  ],
};
