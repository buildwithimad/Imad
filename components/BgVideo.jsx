'use client';

export default function BackgroundVideo({ src }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10"
      src={src}
    >
    </video>
  );
}
