'use client';

import React from 'react';

import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="relative right-0 w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          src="/dot1.svg" 
          alt="Background Dots"
          fill
          className="animate-pulse opacity-10 object-cover"
          priority
        />
      </div>
    </div>
  );
}
