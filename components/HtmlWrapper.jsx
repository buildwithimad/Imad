'use client';

import { usePathname } from "next/navigation";

export default function HtmlWrapper({ children }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  return (
    <html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'}>
      {children}
    </html>
  );
}