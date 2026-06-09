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
          base:     '#0d0d0f',
          card:     '#17171b',
          elevated: '#1f1f25',
          border:   '#2e2e38',
        },
        ink: {
          primary:   '#f4f4f6',
          secondary: '#8b8b9e',
          muted:     '#52526a',
        },
        gold: {
          DEFAULT: '#c8853a',
          light:   '#d9994f',
          dark:    '#a86b2a',
          glow:    'rgba(200,133,58,0.15)',
        },
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 24px rgba(200,133,58,0.2)',
        'card':      '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
