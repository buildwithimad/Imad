// components/ClientWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';
import useLenis from '@/hooks/useLenis'; // your existing hook

export default function ClientWrapper({ children }) {
  useLenis(); // initialize Lenis smooth scrolling

  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
