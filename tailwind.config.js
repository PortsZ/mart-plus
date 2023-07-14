/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        background: '#FFF6F5',
        primary: '#e65100',
        primaryHighlight: '#FFC848',
        // secondary: '#2E4057',
        // secondary: '#3d3b8e',
        // secondary: '#23395b',
        // secondary: '#006989',
        // dark: '#290a00',
        secondary: '#053C5E',
        highlight: '#7ae582',
        dark: '#010c13',
        secondaryHighlight: '#9fffcb',
      },
      fontFamily: {
        logo: ["Montserrat Subrayada", "sans-serif"],
        sleek: ["Montserrat", "sans-serif"],
        text: ["Lato", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
      xxl: "3000px",
    },
  },
  plugins: [
  ],
}
