/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink900: '#142420',
        ink800: '#1c332d',
        paper: '#f6f1e4',
        paperLine: '#ddd4bd',
        brass: '#a9821f',
        brassSoft: '#e4d9b6',
        rust: '#a2503f',
        rustSoft: '#f0ddd6',
        textInk: '#241f16',
        textMuted: '#6b6555',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '3px',
      },
    },
  },
  plugins: [],
};
