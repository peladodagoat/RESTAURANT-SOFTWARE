/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base:     '#f5f0eb',
          card:     '#ffffff',
          elevated: '#faf7f4',
          border:   '#e8ddd4',
        },
        ink: {
          primary:   '#2c1a0e',
          secondary: '#7a5c48',
          muted:     '#a89080',
        },
        gold: {
          DEFAULT: '#8b5e3c',
          light:   '#a0714f',
          dark:    '#6b4528',
          glow:    'rgba(139,94,60,0.15)',
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 24px rgba(139,94,60,0.18)',
        'card':      '0 1px 3px rgba(44,26,14,0.07), 0 1px 2px rgba(44,26,14,0.05)',
      },
    },
  },
  plugins: [],
};
