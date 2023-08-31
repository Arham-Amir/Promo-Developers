'use client'
import { useState } from 'react';
import { BiExpandHorizontal } from 'react-icons/bi'
import CenterBox from '@components/Calculator/centerBox';
import { Suspense } from 'react';

const Constructed = () => {
  const [show, setShow] = useState(false)
  return (
    <section>
      <section>
        <button onClick={() => { setShow(!show) }}
          className={`z-10 fixed top-1/2 -translate-y-1/2 flex items-center h-24 pr-1 pl-2
    bg-[#0694c6] rounded-l-lg transition-all duration-500 ${show ? 'right-[95%]' : 'right-0'}`}>
          <BiExpandHorizontal size={25} fill='white' />
        </button>
        <section className={`fixed top-0 z-50 transition-all duration-500 ${show ? 'xs:right-0' : 'xs:right-[-100%]'}
    h-screen w-[95%] bg-gradient-to-r from-[#00aeef] to-[#ed1c24]`}>

        </section>
      </section>
      <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
        <CenterBox />
      </Suspense>
    </section>
  );
}

export default Constructed;