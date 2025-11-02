// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'UniPort - Student Verification System',
  description: 'University of Port Harcourt Facial Recognition Verification System',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}