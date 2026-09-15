import React from 'react';

export const TealInkWashBackground: React.FC = () => {
  const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260901_122529_931c22c8-8d2d-47c0-ad51-b97f56a91e42.mp4';
  const posterUrl = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4f690bd1-881a-4192-82f2-d714d34c8fb9.png';

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-[#EAE3DE]">
      {/* Looping Japanese Ink-Wash Landscape Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterUrl}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Atmospheric Frosted Cream Dashboard Overlay */}
      <div className="absolute inset-0 bg-[#EAE3DE]/40 backdrop-blur-[2px]" />
    </div>
  );
};