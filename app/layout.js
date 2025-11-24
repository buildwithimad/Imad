import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientProvider from "../components/ClientProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
})

export const metadata = {
  title: "My Portfolio",
  description: "Created with Next.js, Lenis, and Framer Motion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        <Navbar />
        <ClientProvider>{children}</ClientProvider>
        <Footer />
      </body>
    </html>
  );
}
