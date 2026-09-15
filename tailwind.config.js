/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          primary: '#175A67',
          soft: '#2A707C',
          deep: '#0F3C45',
        },
        paper: {
          cream: '#EAE3DE',
          light: '#F4F0EC',
        },
        accent: {
          emerald: '#10B981',
          gold: '#EAB308',
        }
      },
      fontFamily: {
        sans: ['Poppins', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'ink-glass': '0 8px 30px 0 rgba(23, 90, 103, 0.08)',
        'ink-hover': '0 12px 36px 0 rgba(23, 90, 103, 0.16)',
      }
    },
  },
  plugins: [],
}