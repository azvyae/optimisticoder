/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    colors: {
      primary: '#729762',
      secondary: '#DBCC95',
      info: '#C9E3E4',
      success: '#124076',
      warning: '#E7B10A',
      danger: '#C51605',
      light: '#FFFFFF',
      dark: '#19231B',
    },
    extend: {
      transformOrigin: {
        bottom: 'center bottom',
      },
      fontFamily: {
        body: 'var(--font-jetbrains-mono), monospace',
        article: 'var(--font-eb-garamond), serif',
      },
      screens: {
        half: '680px',
        md: '896px',
        hd: '1920px',
        '2k': '2560px',
        '4k': '3820px',
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            pre: {
              color: 'black',
              background: 'transparent',
              padding: 0,
              margin: 0,
            },
          },
        },
        optimisticoder: {
          css: {
            '--tw-prose-body': theme('colors.dark'),
            '--tw-prose-headings': theme('colors.dark'),
            '--tw-prose-lead': theme('colors.dark'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.dark'),
            '--tw-prose-counters': theme('colors.primary'),
            '--tw-prose-bullets': theme('colors.primary'),
            '--tw-prose-hr': theme('colors.dark/10'),
            '--tw-prose-quotes': theme('colors.dark'),
            '--tw-prose-quote-borders': theme('colors.dark/10'),
            '--tw-prose-captions': theme('colors.primary'),
            '--tw-prose-code': theme('colors.dark'),
            '--tw-prose-pre-code': theme('colors.dark'),
            '--tw-prose-pre-bg': '#324d39',
            '--tw-prose-th-borders': theme('colors.dark/30'),
            '--tw-prose-td-borders': theme('colors.dark/30'),
            '--tw-prose-invert-body': theme('colors.light'),
            '--tw-prose-invert-headings': theme('colors.light'),
            '--tw-prose-invert-lead': theme('colors.light'),
            '--tw-prose-invert-links': theme('colors.primary'),
            '--tw-prose-invert-bold': theme('colors.light'),
            '--tw-prose-invert-counters': theme('colors.primary'),
            '--tw-prose-invert-bullets': theme('colors.primary'),
            '--tw-prose-invert-hr': theme('colors.dark/10'),
            '--tw-prose-invert-quotes': theme('colors.dark/10'),
            '--tw-prose-invert-quote-borders': theme('colors.dark/10'),
            '--tw-prose-invert-captions': theme('colors.secondary'),
            '--tw-prose-invert-code': theme('colors.secondary'),
            '--tw-prose-invert-pre-code': theme('colors.secondary'),
            '--tw-prose-invert-pre-bg': theme('colors.dark'),
            '--tw-prose-invert-th-borders': theme('colors.dark/10'),
            '--tw-prose-invert-td-borders': theme('colors.dark/10'),
            pre: {
              color: 'black',
              background: 'transparent',
              padding: 0,
              margin: 0,
            },
          },
        },
      }),
    },
  },
};
