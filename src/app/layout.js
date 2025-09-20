import { Inter } from 'next/font/google'
import "./globals.css"
import AOSInitializer from '../components/AOSInitializer';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GenAI - AI Content Writing & Copywriting",
  description: "A 10X Faster Way To Write Your Technical Writing, News Article, SEO Content, Product Description",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <link rel="stylesheet" href="/assets/css/plugins.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        {children}
        <AOSInitializer />
      </body>
    </html>
  );
}
