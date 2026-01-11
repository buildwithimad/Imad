'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TransitionOverlay() {
  const pathname = usePathname();
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.8,
        ease: 'power4.inOut',
      }
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[999] origin-top pointer-events-none"
    />
  );
}
