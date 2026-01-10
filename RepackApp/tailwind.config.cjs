/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.js',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
		extend: {
      colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				background: "var(--color-background)",
      },
      fontFamily: {
        primary: "var(--font-family-primary)",
        secondary: "var(--font-family-secondary)",
        tertiary: "var(--font-family-tertiary)",
      },
    },
  },
  plugins: [],
};
