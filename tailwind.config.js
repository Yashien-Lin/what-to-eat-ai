/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // Next.js 頁面
    "./components/**/*.{js,ts,jsx,tsx}", // 組件
    "./app/**/*.{js,ts,jsx,tsx}",      // 如果你有 App Router
  ],
  theme: {
    // extend: {
    //   colors: {
    //     amber: {
    //       50: '#fff8e5',
    //       100: '#ffecb3',
    //       200: '#ffe082',
    //       500: '#f59e0b',
    //       600: '#d97706',
    //     },
    //     purple: {
    //       500: '#8b5cf6',
    //       600: '#7c3aed',
    //       700: '#6d28d9',
    //     },
    //   },
    //   animation: {
    //     'pot-swing': 'swing 1s ease-in-out infinite',
    //     'marquee': 'marquee 3s linear infinite',
    //   },
    //   keyframes: {
    //     swing: {
    //       '0%, 100%': { transform: 'rotate(-5deg)' },
    //       '50%': { transform: 'rotate(5deg)' },
    //     },
    //     marquee: {
    //       '0%': { transform: 'translateX(-100%)' },
    //       '100%': { transform: 'translateX(100%)' },
    //     },
    //   },
    // },
  },
  plugins: [],
};
