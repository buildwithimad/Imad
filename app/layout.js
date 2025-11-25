// app/layout.jsx
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientWrapper from '@/components/ClientWrapper';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <GoogleAnalytics />
        <Navbar />
        <ClientWrapper>
          {children} {/* all page content */}
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
