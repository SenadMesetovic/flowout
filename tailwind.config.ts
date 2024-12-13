import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#66C56B',
        background: '#C1F4C5',
        gradientDark: '#4BDC55',
        gradientLight: '#BEF5C2',
      },
    },
  },
  plugins: [],
} satisfies Config;
