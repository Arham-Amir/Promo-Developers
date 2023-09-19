/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '17%',
        '2/7': '25%',
        '3/7': '42%',
        '4/7': '58%',
        '5/7': '71%',
        '6/7': '83%',
        '1/8': '8%',
        '7/8': '92%',
      },
      screens: {
        'xs': '0px',
        'sm': '480px',
        'lg': '1000px',
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
        'themeFont': ['var(--font-myFont)'],
        'heading': ['var(--font-heading)'],
      },
      colors: {
        'bg-dark' : '#333C4B',
        // 'themeFont': '#f85606',
        // 'themeFont': '#FFA900',
        'themeFont': '#2D1B0C',
        'bg-light': '#4A4C5C',
        'lightFont': '#FFFFFF',
        // 'bg': '#F4F4F4',
        'bg': '#E4D8B4',
        'bg-1': '#DBC99A',
        'bg-card': '#DBC99A',
        'bg-card-light': '#fafafa',
        // 'body': '#DBC99A',
        'body': '#E4D8B4',
        'heading': '#2D1B0C',
        'heading-txt': 'white',
        'navBg': '#E4D8B4',
        'navTxt': 'black',
      }
    },
  },
  plugins: [require("daisyui")],
}
