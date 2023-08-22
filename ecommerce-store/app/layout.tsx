import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

import  ModalProvider  from "@/providers/modal-provider";
import  ToasterProvider  from "@/providers/toast-provider";
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '../providers/theme-provider';

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caddis Store',
  description: 'Shop everything electronic on Caddis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <ClerkProvider>
    <html lang="en">
      <body className={font.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
          <ToasterProvider />
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
