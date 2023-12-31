'use client'
import './slider.css';
import LazyImage from '../lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';
import { useState } from 'react';

export default function Slider({ data }) {
  const [img, setimg] = useState("");
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Grid, Navigation]}
        grid={{
          rows: 2,
          fill: "row",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        className={`mySwiper`}
      >
        {data.map((e, i) => (
          <SwiperSlide onClick={() => {
            setimg(e)
            document.getElementById("model-7").showModal()
          }}
            key={i} className='hover:cursor-zoom-in' ><LazyImage className="h-[250px] w-full object-fill border-4 border-gray-300" src={e} /></SwiperSlide>
        ))}
      </Swiper>
      <dialog id="model-7" className="modal min-w-screen min-h-screen">
        <div className="modal-box min-h-[80%] min-w-[80%] py-10 custom-scrollbar z-40">
          <button onClick={() => {
            document.getElementById("model-7").close();
          }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <section className="flex-all-center flex-col gap-5">
            <img className="object-fit" src={img} alt="map image" />
          </section>
        </div>
      </dialog>
    </>
  );
};
