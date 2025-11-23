import { Sora } from "next/font/google";
import "./globals.css";
import ClientProvider from "../components/ClientProvider";
import Navbar from "@/components/Navbar";

const sora = Sora({
  variable: "--font-sora",
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
        className={`${sora.variable} antialiased`}
      >
       <Navbar/>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
