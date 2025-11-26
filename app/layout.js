// app/layout.jsx
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientWrapper from '@/components/ClientWrapper';
import LayoutWrapper from '@/components/LayoutWrapper';
import GoogleTagManager from '@/components/GoogleTagManager';

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
        <GoogleAnalytics />
        <LayoutWrapper>
          <ClientWrapper>
            {children} {/* all page content */}
          </ClientWrapper>
        </LayoutWrapper>
      </body>
    </html>
  );
}
