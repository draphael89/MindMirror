const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          cosmic: {
            DEFAULT: "#050314",
            from: "#050314",
            to: "#1C0E3C",
          },
        },
        text: {
          light: "#FFFFFF",
          accent: {
            cyan: "#4CC9F0",
            pink: "#F72585",
            orange: "#FF9E00",
          },
        },
        primary: {
          light: "#4CC9F0",
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'text-glow-hover': 'textGlowHover 0.3s ease-in-out forwards',
      },
      keyframes: {
        // ... (keep existing keyframes)
        glow: {
          '0%, 100%': { 
            opacity: 1,
            textShadow: '0 0 5px rgba(76, 201, 240, 0.3), 0 0 10px rgba(76, 201, 240, 0.2), 0 0 15px rgba(76, 201, 240, 0.1)'
          },
          '50%': { 
            opacity: 0.8,
            textShadow: '0 0 20px rgba(76, 201, 240, 0.6), 0 0 35px rgba(76, 201, 240, 0.4), 0 0 50px rgba(76, 201, 240, 0.2)'
          },
        },
        textGlowHover: {
          '0%': { textShadow: '0 0 5px rgba(76, 201, 240, 0.3)' },
          '100%': { textShadow: '0 0 20px rgba(76, 201, 240, 0.6), 0 0 35px rgba(76, 201, 240, 0.4), 0 0 50px rgba(76, 201, 240, 0.2)' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-glow': {
          textShadow: '0 0 5px rgba(76, 201, 240, 0.3), 0 0 10px rgba(76, 201, 240, 0.2), 0 0 15px rgba(76, 201, 240, 0.1)',
        },
        '.text-glow-hover': {
          '&:hover': {
            textShadow: '0 0 20px rgba(76, 201, 240, 0.6), 0 0 35px rgba(76, 201, 240, 0.4), 0 0 50px rgba(76, 201, 240, 0.2)',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}