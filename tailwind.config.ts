import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EVA Design Tokens - Light Theme (Münchner Psychologin Palette)
        eva: {
          // Warm cream / paper canvas backgrounds
          bg: '#F3EFE6',
          'bg-soft': '#EEE9DC',
          card: '#FFFFFF',
          'card-elev': '#FFFFFF',
          'card-deep': '#FAF7F0',
          border: '#E5DFD2',
          'border-soft': '#EFEAE0',

          // Slate-navy ink text colors
          text: '#23303C',
          'text-dim': '#5E6E7D',
          'text-muted': '#8E97A2',

          // Primary - Laura's gedämpftes Schiefer-Navy
          blue: '#54657A',
          'blue-deep': '#3F4E60',
          'blue-soft': 'rgba(84,101,122,0.10)',
          'blue-line': 'rgba(84,101,122,0.28)',
          'blue-text': '#3F4E60',

          // Warm muted gold - Geld & Premium
          gold: '#9A7E45',
          'gold-soft': 'rgba(154,126,69,0.10)',
          'gold-line': 'rgba(154,126,69,0.30)',
          'gold-text': '#6E5A30',

          // Sage green - OK / Success
          green: '#5A9070',
          'green-soft': 'rgba(90,144,112,0.10)',
          'green-line': 'rgba(90,144,112,0.30)',
          'green-text': '#3F6E54',

          // Warm amber - Warning
          yellow: '#C29442',
          'yellow-soft': 'rgba(194,148,66,0.12)',
          'yellow-line': 'rgba(194,148,66,0.30)',
          'yellow-text': '#8B6A2E',

          // Muted terracotta - Critical / Error
          red: '#B85A5A',
          'red-soft': 'rgba(184,90,90,0.10)',
          'red-line': 'rgba(184,90,90,0.30)',
          'red-text': '#8C3F3F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      borderRadius: {
        'eva': '14px',
        'eva-sm': '9px',
        'eva-lg': '18px',
      },
      boxShadow: {
        'eva-card': '0 1px 0 rgba(35,48,60,0.02), 0 2px 4px rgba(35,48,60,0.02)',
        'eva-button': '0 1px 0 rgba(255,255,255,0.10) inset',
      },
      animation: {
        'eva-pulse': 'eva-pulse 2.4s ease-out infinite',
      },
      keyframes: {
        'eva-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '80%': { transform: 'scale(2.6)', opacity: '0' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
