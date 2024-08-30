/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "hsl(222, 47%, 11%)",
          dark: "hsl(222, 47%, 5%)",
          cosmic: "hsl(240, 67%, 8%)",
        },
        text: {
          light: "hsl(210, 40%, 98%)",
          dark: "hsl(210, 40%, 98%)",
        },
        primary: {
          light: "hsl(217, 91%, 60%)",
          DEFAULT: "hsl(217, 91%, 60%)",
          dark: "hsl(217, 91%, 60%)",
        },
        secondary: {
          light: "hsl(271, 91%, 65%)",
          DEFAULT: "hsl(271, 91%, 65%)",
          dark: "hsl(271, 91%, 65%)",
        },
        accent: {
          light: "hsl(52, 100%, 50%)",
          DEFAULT: "hsl(52, 100%, 50%)",
          dark: "hsl(52, 100%, 50%)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary.light"), 0 0 20px theme("colors.primary.light")',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}