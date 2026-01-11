// app/layout.jsx
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';
import LayoutWrapper from '@/components/LayoutWrapper';
import GoogleTagManager from '@/components/GoogleTagManager';
import LenisProvider from '@/components/Ui/LenisProvider';
import { Bot } from 'lucide-react';
import BottomHUD from '@/components/BottomSocials';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager/>
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <LenisProvider>
        <LayoutWrapper>
          <ClientWrapper>
            <BottomHUD />
            {children} {/* all page content */}
            <BottomHUD/>
          </ClientWrapper>
        </LayoutWrapper>
        </LenisProvider>
      </body>
    </html>
  );
}
