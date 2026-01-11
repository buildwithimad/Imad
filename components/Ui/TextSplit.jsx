'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextSplit({
  text,
  as: Tag = 'h2',
  className = '',
  stagger = 0.06,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into words
    const words = el.innerText.split(' ');
    el.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden mr-[0.25em]">
             <span class="inline-block will-change-transform opacity-0 translate-y-[120%]">
               ${word}
             </span>
           </span>`
      )
      .join('');

    const targets = el.querySelectorAll('span span');

    gsap.to(targets, {
      y: '0%',
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  }, [stagger]);

  return (
    <Tag
      ref={containerRef}
      className={className}
      aria-label={text}
    >
      {text}
    </Tag>
  );
}
