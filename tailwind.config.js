/** @type {import("tailwindcss").Config} */

export default {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
    },
    variants: {
      fill: ['hover', 'focus'],
    },
    extend: {
      fontSize: {
        title: ['40px', '2.5rem'],
        description: ['16px', '1rem'],
        'task-title': ['20px', '1.25rem'],
        'task-button': ['16px', '1rem'],
        'button-text': ['14px', '0.875rem'],
        'input-label': ['12px', '0.75rem'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        light: 300,
      },
      colors: {
        cloud: '#F8FAFC',
        sunflower: '#F5D565',
        sand: '#F5E8D5',
        tangerine: '#E9A23B',
        mint: '#A0ECB1',
        emerald: '#32D657',
        blush: '#F7D4D3',
        cherry: '#DD524C',
        slate: '#E3E8EF',
        steel: '#97A3B6',
        sapphire: '#3662E3',
        smoke: '#00000033',
      },
    },
  },
}
