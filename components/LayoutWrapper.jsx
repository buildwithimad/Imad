'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks"; 

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check if current path contains "studio"
  const isStudioPage = pathname?.includes("studio");

  return (
    <>
      {!isStudioPage && <Navbar />}
      {!isStudioPage && <SocialLinks />}

      <main>{children}</main>

      {!isStudioPage && <Footer />}
    </>
  );
}
