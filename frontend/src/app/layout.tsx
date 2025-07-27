import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alamin Mahamud - AI Solution Architect, Infra/MLOps",
  description: "Portfolio website of Alamin Mahamud, an AI Solution Architect, Infra/MLOps/DevOps/SRE Lead.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
