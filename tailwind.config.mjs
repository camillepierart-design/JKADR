/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm off-white paper — the dominant surface.
        paper: {
          DEFAULT: '#FAF8F4',
          dim: '#F1EDE3', // stone — alternate section background
          deep: '#EAE4D7', // slightly deeper stone for insets
        },
        // Near-black warm ink, never pure black.
        ink: {
          DEFAULT: '#1A1A1A',
          muted: '#46433E', // body copy on paper
          soft: '#6F6A60', // captions, meta, eyebrows
          line: '#DCD6C9', // hairline borders (used at 0.5–1px)
        },
        // Deep, muted bordeaux — used sparingly as the single accent.
        bordeaux: {
          DEFAULT: '#6B1F1F',
          hover: '#511717',
          light: '#C98E8E', // muted rose — accent on dark surfaces only
          tint: '#F0E7E2', // very faint wash, rare use only
        },
        // Warm anthracite — footer / dark sections only.
        night: {
          DEFAULT: '#171513',
          soft: '#A8A296',
          line: '#332F2A',
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 4.4vw, 3.5rem)', { lineHeight: '1.07', letterSpacing: '-0.022em' }],
        'display-md': ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.018em' }],
        'display-sm': ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.012em' }],
        lede: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.7' }],
        meta: ['0.78rem', { lineHeight: '1.5', letterSpacing: '0.14em' }],
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
      maxWidth: {
        shell: '78rem', // ~1248px outer shell
        wide: '72rem',
        measure: '40rem', // ~640px reading measure
        'measure-lg': '46rem', // ~736px
      },
      spacing: {
        section: '7rem',
        'section-lg': '10rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      typography: ({ theme }) => ({
        editorial: {
          css: {
            '--tw-prose-body': theme('colors.ink.muted'),
            '--tw-prose-headings': theme('colors.ink.DEFAULT'),
            '--tw-prose-links': theme('colors.bordeaux.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-counters': theme('colors.ink.soft'),
            '--tw-prose-bullets': theme('colors.ink.line'),
            '--tw-prose-quotes': theme('colors.ink.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.bordeaux.DEFAULT'),
            '--tw-prose-hr': theme('colors.ink.line'),
            maxWidth: theme('maxWidth.measure-lg'),
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            p: { marginTop: '1.4em', marginBottom: '0' },
            'p:first-of-type': { marginTop: '0' },
            a: {
              fontWeight: '400',
              textDecoration: 'none',
              backgroundImage: `linear-gradient(${theme('colors.bordeaux.DEFAULT')}, ${theme('colors.bordeaux.DEFAULT')})`,
              backgroundPosition: '0 95%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 1px',
              transition: 'background-size 0.3s ease',
            },
            'a:hover': { backgroundSize: '100% 1.5px' },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '500',
              fontSize: '1.75rem',
              letterSpacing: '-0.015em',
              marginTop: '2.6em',
              marginBottom: '0.6em',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '500',
              fontSize: '1.3rem',
              marginTop: '2em',
              marginBottom: '0.5em',
            },
            blockquote: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontStyle: 'italic',
              fontWeight: '400',
              fontSize: '1.35rem',
              lineHeight: '1.5',
              color: theme('colors.ink.DEFAULT'),
              borderLeftWidth: '2px',
              paddingLeft: '1.6rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            strong: { fontWeight: '600' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
