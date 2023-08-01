import withMT from '@material-tailwind/react/utils/withMT'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        Lbgimg: "url('/Rectangle32.png')",
      },
      colors: {
        ...colors,
        'Chinese-Black-sidebar': '#161616',
        'light-white': '#FFFFFF',
        tomato: '#FF5757',
        'custom-grey': '#1e1e1e',
        snow: '#F9F9F9',
        green: '#00AC00',
        Inactive: '#B3B3B3',
        gray_light: '#A9A9A9',
      },
      backgroundColor: {
        'light-muted-azure': '#5599FF',
        'custom-grey': '#1e1e1e',
      },
    },
    fontFamily: {
      body: ['"Montserrat"', '"Open Sans"'],
    },
  },
  plugins: [],
})
