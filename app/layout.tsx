import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Sakana Detail | Detailing Profesional en el País Vasco',
  description: 'Limpieza integral, corrección de pintura y tratamientos cerámicos de alta gama para coches y motos en el País Vasco.',
  keywords: 'detailing, pulido, cerámica, coches, motos, País Vasco, Irún, Gipuzkoa',
  openGraph: {
    title: 'Sakana Detail | Detailing Profesional',
    description: 'Tu vehículo merece lo mejor. Detailing profesional en el País Vasco.',
    type: 'website',
    locale: 'es_ES',
  },
}

// Aplica tema e idioma guardados ANTES del primer pintado, evitando parpadeo (FOUC).
const noFlashScript = `
(function() {
  try {
    var theme = localStorage.getItem('sakana-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    var lang = localStorage.getItem('sakana-lang') || 'es';
    document.documentElement.setAttribute('lang', lang);
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
