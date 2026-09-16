/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          50: '#FDF7F4',
          100: '#F9ECE5',
          200: '#F2D7CA',
          300: '#EABFA9',
          400: '#E29A7D',
          500: '#D95D39', // Signature Terracotta Clay
          600: '#C24925',
          700: '#9C371B',
          800: '#7A2C17',
          900: '#541F11',
        },
        cream: {
          50: '#FAF8F3', // Warm canvas background
          100: '#F5EFE4',
          200: '#EBDDC9',
          300: '#DFC8A8',
        },
        charcoal: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917', // Deep text
          900: '#141211',
        },
        forest: {
          50: '#F0F7F4',
          100: '#DCEEE6',
          500: '#2E6F56',
          600: '#225541', // Bold secondary accent CTA
          700: '#1A4233',
          800: '#133226',
        },
        mustard: {
          50: '#FDF9EC',
          100: '#FBF0CE',
          400: '#F5BE4E',
          500: '#E8A428', // Warm saffron badge accent
          600: '#C98717',
        },
        indigoCraft: {
          500: '#2B4C7E',
          600: '#1F375D',
        }
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px #1C1917',
        'brutal': '4px 4px 0px #1C1917',
        'brutal-lg': '6px 6px 0px #1C1917',
        'brutal-xl': '8px 8px 0px #1C1917',
        'brutal-clay': '4px 4px 0px #D95D39',
        'brutal-forest': '4px 4px 0px #225541',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
