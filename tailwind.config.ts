import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import DefaultTheme from 'tailwindcss/defaultTheme'
import TailwindTypography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', ...DefaultTheme.fontFamily.sans]
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui(), TailwindTypography]
}
export default config
