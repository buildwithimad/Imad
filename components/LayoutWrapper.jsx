'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check if current path contains "studio"
  const isStudioPage = pathname?.includes("studio");

  return (
    <>
      {!isStudioPage && <Navbar />}

      <main>{children}</main>

      {!isStudioPage && <Footer />}
    </>
  );
}
