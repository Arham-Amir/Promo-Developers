'use client'
import Box from '@components/Calculator/box';
import { Suspense } from 'react';

const Constructed = (props = {}) => {
  return (
    <section>
      <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
        <Box landsize={props.landsize} area={props.area} />
      </Suspense>
    </section>
  );
}

export default Constructed;
