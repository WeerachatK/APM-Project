/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',],
  plugins: [ require('flowbite/plugin')] ,
  corePlugins: {
    position: true,
  },
  theme: {
    colors: {
      "Blue-700": "#142e4f",
      "Blue-600": "#002880",
      "Blue-500": "#0034a6",
      "Blue-400": "#234693",
      "Blue-300": "#335eff",
      "Blue-200": "#d9e1f5",
      "Blue-100": "#eef3ff",
      "Purple-100": "#fbeeff",
      "Purple-200": "#eed9f5",
      "Purple-300": "#995bff",
      "Purple-400": "#622393",
      "Purple-500": "#4d00a6",
      "Purple-600": "#380080",
      "Purple-700": "#23144f",
      "orange": "#cd5d20",
      "cream": "#f9e2d5",
      "black": "#000000",
      "white": "#ffffff",
      "Green": "#10973b",
      "red": "#d80000",
      "yellow": "#fff500",
      "gray-text": "#9f9f9f",
      "gray-component": "#f1f1f1",
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'menu-blue': 'rgba(0, 82, 255, 0.30)',
    },
    boxShadow: {
      "shadow-sm": "0px 1px 2px 0px rgba(0,0,0,0.05)",
      "shadow-base": "0px 1px 2px 0px rgba(0,0,0,0.06), 0px 1px 3px 0px rgba(0,0,0,0.1)",
      "shadow-md": "0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.1)",
      "shadow-lg": "0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.1)",
      "shadow-2xl": "0px 25px 50px -12px rgba(0,0,0,0.25)",
      "shadow-inner": "inset 0px 2px 4px 0px rgba(0,0,0,0.06)"
    },
    fontFamily: {
      "sans": ['Inter var']
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
      fontFamily: {
        'inter': ['Inter Var'], // Adds a new `font-display` class
      }
    }
  },
};

