import React from 'react';
import Video from './video/video';
import Slider from '@components/Base/slider/slider';

const ChildComp = () => {

  const elevation = [
    "/elevation/1.jpg",
    "/elevation/2.jpg",
    "/elevation/3.jpg",
    "/elevation/4.jpg",
    "/elevation/5.jpg",
    "/elevation/6.jpg",
    "/elevation/7.jpg",
    "/elevation/8.jpg",
    "/elevation/9.jpg",
    "/elevation/12.jpg",
    "/elevation/13.jpg",
    "/elevation/15.jpg",
    "/elevation/16.jpg",
    "/elevation/17.jpg",
    "/elevation/18.jpg",
    "/elevation/19.jpg",
    "/elevation/20.jpg",
    "/elevation/21.jpg",
    "/elevation/22.jpg",
  ]
  return (
    <section >
      <section className='mb-10 flex flex-col gap-10'>
        <Video src={"https://www.youtube.com/embed/H2yM0VKFze8?si=ablgoRsRvDMTtv7e"} />
        <section className='w-full flex flex-col items-center gap-10'>
          <h1 className='w-4/5 border text-center mt-5 p-5 mx-auto font-heading'>Elevation Designs</h1>
          <section className='w-11/12 px-5'>
            <Slider data={elevation} />
          </section>
        </section>
      </section>
    </section>
  );
}

export default ChildComp;

