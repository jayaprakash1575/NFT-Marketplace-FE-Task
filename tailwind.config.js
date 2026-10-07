/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nft: {
          bg: '#0D0B1A',
          card: '#1B1736',
          'card-hover': '#241F48',
          sidebar: '#14112B',
          header: '#120F26',
          input: '#131129',
          border: 'rgba(255, 255, 255, 0.06)',
          purple: '#6F4FF2',
          'purple-hover': '#5E3EE0',
          'purple-light': 'rgba(111, 79, 242, 0.15)',
          green: '#22C55E',
          yellow: '#F59E0B',
          coral: '#D93F4A',
          muted: '#8B8AA0',
          subtle: '#6E6D82',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0, 0, 0, 0.25)',
        'glow-purple': '0 0 25px rgba(111, 79, 242, 0.35)',
      }
    },
  },
  plugins: [],
}
