/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#080B12', 900: '#0C1018', 800: '#121826', 700: '#1B2336', 600: '#2A3550' },
        paper: { DEFAULT: '#ECE9F4', dim: '#A9A7BC', mute: '#6E7089' },
        signal: { DEFAULT: '#8B9BFF', deep: '#5B6CFF' },
        amber: { glow: '#F2B66D' },
        ok: '#6FD3A8',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Geist Variable"', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', '"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
