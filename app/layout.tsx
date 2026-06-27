import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lucaspatano.com'
const DESCRIPTION = 'Más de 15 años en producto y growth en startups, fintechs y corporaciones de LATAM. Mentorías 1:1 y coaching para CEOs, founders y líderes de producto.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Lucas Patanó - Product Coach',
    template: '%s — Lucas Patanó',
  },
  description: DESCRIPTION,
  keywords: ['product coach', 'mentoría producto', 'product manager LATAM', 'coaching liderazgo', 'fintech producto', 'Lucas Patanó'],
  authors: [{ name: 'Lucas Patanó', url: BASE_URL }],
  creator: 'Lucas Patanó',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: BASE_URL,
    siteName: 'Lucas Patanó - Product Coach',
    title: 'Lucas Patanó — Product Coach',
    description: DESCRIPTION,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Lucas Patanó — Product Coach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Patanó - Product Coach',
    description: DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@lucaspatano',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark" data-accent="cobalt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D35140D4G9"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D35140D4G9');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}