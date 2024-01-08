/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xxs': { 'max': '290px' },
      },
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
      width:{
        '1/8': "12.5%"
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
        'themeFont': ['var(--font-myFont)'],
        'heading': ['var(--font-heading)'],
      },
      colors: {
        'bg-dark': '#333C4B',
        // 'themeFont': '#f85606',
        // 'themeFont': '#FFA900',
        'themeFont': '#291334',
        'bg-light': '#4A4C5C',
        'lightFont': '#FFFFFF',
        // 'bg': '#F4F4F4',
        'bg': '#FAF7F5',
        'bg-1': '#E7E2DF',
        'bg-card': '#E7E2DF',
        'bg-card-light': '#E7E2DF',
        // 'body': '#DBC99A',
        'body': 'white',
        'heading': '#291334',
        'heading-txt': 'white',
        'navBg': '#FAF7F5',
        'navTxt': 'black',
      }
    },
  },
  plugins: [require("daisyui")],
}
