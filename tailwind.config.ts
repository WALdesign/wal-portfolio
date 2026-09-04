import type { Config } from 'tailwindcss'

// Tailwind aquí solo se usa para utilidades de layout (flex, grid, spacing,
// posicionamiento, breakpoints). Colores y tipografía viven en variables CSS
// propias dentro de src/app/globals.css.
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}

export default config
