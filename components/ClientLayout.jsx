'use client';

import ClientProvider from "./ClientProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function ClientLayout({ children }) {
  return (
    <>
      <GoogleAnalytics />
      <Navbar />
      <ClientProvider>{children}</ClientProvider>
      <Footer />
    </>
  );
}