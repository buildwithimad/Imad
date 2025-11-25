import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import HtmlWrapper from "../components/HtmlWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap', // Add display swap for better performance
});

// Generate metadata for the root layout
export async function generateMetadata() {
  return {
    metadataBase: new URL('https://www.imadkhan.online'),
    title: 'Imad Hussain Khan | Full-Stack Web Developer',
    description: 'Portfolio of Imad Hussain Khan, a skilled Full-Stack Web Developer & Designer specializing in React.js, Node.js, MERN Stack, and modern web technologies.',
    keywords: [
      'Imad Hussain Khan',
      'Full Stack Web Developer Saudi Arabia',
      'React.js Developer',
      'Node.js Expert',
      'MERN Stack Developer',
      'Web Development Portfolio',
      'JavaScript Developer',
      'Next.js Portfolio',
      'Sanity CMS Integration'
    ],
    authors: [{ name: 'Imad Hussain Khan' }],
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    alternates: {
      canonical: 'https://www.imadkhan.online',
      languages: {
        'en': 'https://www.imadkhan.online/en',
        'ar': 'https://www.imadkhan.online/ar',
      },
    },
    openGraph: {
      title: 'Imad Hussain Khan | Full-Stack Web Developer',
      description: 'Discover the portfolio of Imad Hussain Khan, a skilled Full-Stack Web Developer & Designer in Saudi Arabia.',
      url: 'https://www.imadkhan.online',
      siteName: 'Imad Hussain Khan Portfolio',
      images: [{
        url: 'https://www.imadkhan.online/logo.png',
        width: 1200,
        height: 630,
        alt: 'Imad Hussain Khan - Full-Stack Web Developer Portfolio'
      }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Imad Hussain Khan | Full-Stack Web Developer',
      description: 'Portfolio of Imad Hussain Khan, Full-Stack Web Developer & Designer based in Saudi Arabia.',
      images: ['https://www.imadkhan.online/logo.png'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/logo.png',
    },
    manifest: '/manifest.json',
    other: {
      'theme-color': '#000000',
      'color-scheme': 'dark light',
      'msapplication-TileColor': '#000000',
      'application-name': 'Imad Hussain Khan Portfolio',
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <HtmlWrapper>
      <GoogleAnalytics />
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
        {children}
      </body>
    </HtmlWrapper>
  );
}
