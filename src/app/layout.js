import { Inter } from 'next/font/google'
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ijaad Labs Blog",
  description: "Digital Experience Blog",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-gray-100 min-h-screen`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

