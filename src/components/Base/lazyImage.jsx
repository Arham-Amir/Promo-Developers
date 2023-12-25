'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const LazyImage = ({ src, className }) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <>
      <Image
        alt=""
        src={src}
        width={1000}
        height={1000}
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
