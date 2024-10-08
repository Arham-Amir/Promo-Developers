'use client'
import Link from 'next/link';
import { Link as Lin } from 'react-scroll';
import React, { useRef, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SideBySide = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const textRef1 = useRef(null);

  const handleIntersection1 = (entries) => {
    const entry = entries[0];
    setIsVisible1(entry.intersectionRatio >= 1);
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    const observer1 = new IntersectionObserver(handleIntersection1, options);
    if (textRef1.current) {
      observer1.observe(textRef1.current);
    }
    return () => {
      if (textRef1.current) {
        observer1.unobserve(textRef1.current);
      }
    };
  }, []);

  return (
    <section className='h-auto lg:h-[86vh] w-screen flex flex-col lg:flex-row text-themeFont'>
      <section className='w-full lg:w-1/2 h-auto py-20 bg-bg-dark'>
        <section className='mx-auto w-4/5 h-full flex flex-col justify-center items-center gap-10 text-lightFont text-center'>
          <h1 data-text={`Promo Developers`} style={{ whiteSpace: 'nowrap', letterSpacing: '4px', wordSpacing: '8px' }}
            ref={textRef1} className={`intro_text intro_h1 text-xl sm:text-[30px] ${isVisible1 ? 'visible' : ''}`}>
            Promo Developers
          </h1>
          <p className='font-sans'>Promo Developers is a leading construction firm specializing in providing high-quality construction and contracting services. With a commitment to excellence and a customer-centric approach, we have established a strong reputation in the industry for delivering outstanding results. Our team of experienced professionals and skilled craftsmen work collaboratively to meet our client's unique construction need.</p>
          <Lin to="services" smooth={true} offset={-20} duration={500}><FaChevronDown className='text-4xl lg:text-6xl cursor-pointer' /></Lin>
          {/* <section className="bg-themeFont ml-2 rounded-md w-fit">
            <section className="border-themeFont bg-bg-light border -translate-x-[2px] -translate-y-[2px] px-5 py-2 rounded-md hover:-translate-x-1 hover:-translate-y-1 ease-in-out transition duration-300 text-xl">
              <Link href="/calculator">Calculator</Link>
            </section>
          </section> */}
        </section>
      </section>
      <section className='w-full lg:w-1/2 h-[50vh] lg:h-full bg-[url("/image/intro.jpg")] bg-cover'></section>
    </section>
  );
};

export default SideBySide;
