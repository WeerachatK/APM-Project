/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [],
  corePlugins: {
    position: true,
  },
  theme: {
    colors: {
      'black': '#000',
      'white': '#fff',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'menu-blue': 'rgba(0, 82, 255, 0.30)',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: theme => ({
        'blue-x-gradient': 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 7.21%, rgba(3, 42, 129, 0.52) 46.18%, #002880 96.15%)',
        'green-x-gradient': 'linear-gradient(270deg, rgba(255, 255, 255, 0.00) 7.21%, rgba(87, 182, 117, 0.58) 37.37%, rgba(37, 160, 76, 0.88) 71.19%, #10973B 96.15%)',
      }),
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      height: {
        'screen-nav': 'calc(100vh - 3.5rem)',
      },
    }
  },
};

