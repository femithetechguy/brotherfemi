export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C5282',
        secondary: '#D69E2E',
        accent: '#38A169',
        dark: '#1A202C',
        light: '#F7FAFC',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
