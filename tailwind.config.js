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
      screens:{
        'xs':'0px',
        'sm': '400px',
      }
    },
  },
  plugins: [],
}
