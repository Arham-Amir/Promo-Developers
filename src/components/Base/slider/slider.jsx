'use client'
import './slider.css';
import LazyImage from '../lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation} from 'swiper/modules';

export default function Slider({data}) {
  return (
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
        <SwiperSlide key={i} ><LazyImage className="h-[250px] w-full object-fill border-4 border-gray-300" src={e} /></SwiperSlide>
      ))}
    </Swiper>
  );
};
