// components/ClientWrapper.jsx
'use client';

import { usePathname } from 'next/navigation';

export default function ClientWrapper({ children }) {

  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
}
