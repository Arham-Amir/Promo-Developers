'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const LazyImage = ({ src, className, alt = "image not found" }) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <>
      <Image
        alt={alt}
        src={src}
        width={500}
        height={500}
        className={`
          duration-700 ease-in-out
          ${className}
          ${isLoading
            ? 'scale-110 blur-sm grayscale'
            : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoad={() => setLoading(false)}
      />
    </>
  );
}
export default LazyImage;
