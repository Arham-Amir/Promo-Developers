import LazyImage from '@/components/base/lazyImage';
import React from 'react';

const GalleryImages = () => {
  const data = [
    "/images/homegal1.jpg",
    "/images/homegal2.jpg",
    "/images/homegal3.jpg",
    "/images/homegal4.jpg",
    "/images/homegal5.jpg",
    "/images/homegal6.jpg",
  ]
  return (
    <section className='max-w-screen h-auto px-4 my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4'>
      {data.map((e, i) => (
        <LazyImage className="h-[250px] lg:h-[300px] w-full object-cover" key={i} src={e} />
      ))}
    </section>
  );
}

export default GalleryImages;
