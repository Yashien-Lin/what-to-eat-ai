/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './app.vue',
    './nuxt.config.ts'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(168, 85, 247)',     // purple-500
        secondary: 'rgb(233, 213, 255)',  // purple-200
        accent: 'rgb(244, 114, 182)',     // pink-400
        neutral: 'rgb(55, 65, 81)',       // gray-700
      }
    }
  },
  plugins: []
}

