import type { Config } from 'tailwindcss'

// Permite que los tokens de Tailwind respondan al tema activo y sigan
// aceptando modificadores de opacidad, ej. bg-gold/50
function withOpacity(varName: string) {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue !== undefined
      ? `rgb(var(${varName}) / ${opacityValue})`
      : `rgb(var(${varName}))`
}

// Tailwind soporta colores como función para el patrón de variables CSS con
// opacidad (ver docs oficiales), pero el tipo `Config` no lo modela — se
// castea al exportar en vez de tipar aquí para no perder el resto del chequeo.
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: withOpacity('--bg-page'),
        'bg-secondary': withOpacity('--bg-card'),
        carbon: withOpacity('--bg-surface'),
        'text-primary': withOpacity('--text-primary'),
        'text-muted': withOpacity('--text-muted'),
        blue: withOpacity('--accent-blue'),
        gold: withOpacity('--accent-gold'),
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        display: '0.05em',
        label: '0.12em',
      },
    },
  },
  plugins: [],
}

export default config as unknown as Config
