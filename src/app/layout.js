import { Inter } from 'next/font/google'
import "./globals.css"
import AOSInitializer from '../components/AOSInitializer';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "Ijaad Labs - Full-Stack Software Development & AI Solutions",
    template: "%s | Ijaad Labs"
  },
  description: "Leading software development agency specializing in full-stack web development, mobile apps, AI solutions, and digital transformation. Trusted by innovators across industries.",
  keywords: [
    "software development",
    "web development", 
    "mobile app development",
    "AI solutions",
    "generative AI",
    "digital transformation",
    "cloud computing",
    "full-stack development",
    "custom software",
    "enterprise solutions"
  ],
  authors: [{ name: "Ijaad Labs" }],
  creator: "Ijaad Labs",
  publisher: "Ijaad Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ijaadlabs.com',
    siteName: 'Ijaad Labs',
    title: 'Ijaad Labs - Full-Stack Software Development & AI Solutions',
    description: 'Leading software development agency specializing in full-stack web development, mobile apps, AI solutions, and digital transformation.',
    images: [
      {
        url: '/assets/images/space-technology-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ijaad Labs - Advanced Software Development and AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ijaad Labs - Full-Stack Software Development & AI Solutions',
    description: 'Leading software development agency specializing in full-stack web development, mobile apps, AI solutions, and digital transformation.',
    images: ['/assets/images/space-technology-hero.jpg'],
    creator: '@ijaadlabs',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ijaadlabs.com',
  },
}

export default function RootLayout({
  children,
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ijaad Labs",
    "description": "Leading software development agency specializing in full-stack web development, mobile apps, AI solutions, and digital transformation.",
    "url": "https://ijaadlabs.com",
    "logo": "https://ijaadlabs.com/assets/images/logo.png",
    "image": "https://ijaadlabs.com/assets/images/space-technology-hero.jpg",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://ijaadlabs.com/contact"
    },
    "sameAs": [
      "https://github.com/ijaadlabs",
      "https://linkedin.com/company/ijaadlabs",
      "https://twitter.com/ijaadlabs"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Web Development",
        "description": "Responsive, SEO-optimized websites that engage users and drive conversions"
      },
      {
        "@type": "Service", 
        "name": "Mobile App Development",
        "description": "Custom mobile applications that enhance user engagement and streamline business operations"
      },
      {
        "@type": "Service",
        "name": "AI Solutions",
        "description": "Generative AI solutions to revolutionize business processes and stay ahead of competition"
      },
      {
        "@type": "Service",
        "name": "Digital Transformation",
        "description": "Implement latest technologies for maximum business impact"
      }
    ]
  };

  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <link rel="stylesheet" href="/assets/css/plugins.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ijaad Labs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <AOSInitializer />
      </body>
    </html>
  );
}
