import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import { Preloader } from '@/components/animations/Preloader'
import { ScrollProgress } from '@/components/animations/ScrollProgress'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Providers } from '@/components/providers/Providers'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { activeSocials, profile, siteUrl } from '@/data/profile'
import './globals.css'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

const title = `${profile.name} — ${profile.role}`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  keywords: ['Software Engineer', 'Backend Developer', 'Java', 'Spring Boot', 'REST API', 'Microservices', 'React', 'Next.js'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: `${profile.name} — ${profile.brand}`,
    title,
    description: profile.description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title, description: profile.description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#07090F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Runs before paint: marks JS as available and skips the preloader on deep links, for returning
 * visitors (same session) or anyone who prefers reduced motion.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||location.pathname!=='/'||sessionStorage.getItem('btc-intro-played')==='1'){d.dataset.intro='skip'}var a=localStorage.getItem('btc-accent');if(a==='cyan'||a==='green'){d.dataset.accent=a}}catch(e){}})();`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  ...(activeSocials.length ? { sameAs: activeSocials.map((s) => s.href) } : {}),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{'.preloader{display:none!important}'}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
