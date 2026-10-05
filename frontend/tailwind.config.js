/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Lora', 'Merriweather', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sepia: {
          50: '#fdfbf7',
          100: '#f7f2e8',
          200: '#efe5d2',
          300: '#e5d4b5',
          700: '#644e2b',
          800: '#4e3b20',
          900: '#382a17',
        },
      },
    },
  },
  plugins: [],
}
