import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs'
const Fotter = () => {
  return (
    <section className="bg-slate-900 flex flex-col">

      <section className="w-[85%] mx-auto flex flex-row xs:flex-wrap md:flex-nowrap justify-center md:gap-x-10 py-6">
        <a href="https://www.promodevelopers.com/" target='_blank' className="h-full mx-auto xs:w-1/2 md:w-1/5 px-4 xs:order-2 md:order-1">
          <img className="h-[130px] w-full object-contain hover:-translate-y-2 hover:border-t-4 transition-all duration-150" src="/logos/promodevelopers.gif" alt="promodevelopers" />
        </a>
        <a href="https://www.promobrick.com/" target='_blank' className="h-full mx-auto xs:w-1/2 md:w-1/5 px-4 xs:order-3 md:order-2">
          <img className="h-[130px] w-full object-contain hover:-translate-y-2 hover:border-t-4 transition-all duration-150" src="/logos/promobrick.gif" alt="promobrick" />
        </a>
        <a href="https://www.promogroup.com.pk/" target='_blank' className="h-full mx-auto xs:w-full md:w-1/5 px-4 xs:order-1 md:order-3">
          <img className="h-[160px] w-full object-contain hover:-translate-y-2 hover:border-t-4 transition-all duration-150" src="/logos/promogroup.gif" alt="promogroup" />
        </a>
        <a href="https://www.promogarlic.com/" target='_blank' className="h-full mx-auto xs:w-1/2 md:w-1/5 px-4 xs:order-4 md:order-4">
          <img className="h-[130px] w-full object-contain hover:-translate-y-2 hover:border-t-4 transition-all duration-150" src="/logos/promogarlic.gif" alt="promogarlic" />
        </a>
        <a href="https://www.promoland.com.pk/" target='_blank' className="h-full mx-auto xs:w-1/2 md:w-1/5 px-4 xs:order-5 md:order-5">
          <img className="h-[130px] w-full object-contain hover:-translate-y-2 hover:border-t-4 transition-all duration-150" src="/logos/promofarms.gif" alt="promoland" />
        </a>
      </section>
      <section className="border-b-2 py-3 w-11/12 mx-auto text-white flex flex-col gap-2">
        <h2 className="text-lg w-fit mx-auto  pb-1">Follow us on</h2>
        <section className="flex flex-row gap-7 items-center w-fit mx-auto py-2 text-white">
          <a className='border rounded-full p-2 hover:border-yellow-500' href='https://www.facebook.com/TechnoPakConstruction/' target="_blank"><BsFacebook size={25}></BsFacebook></a>
          <a className='border rounded-full p-2 hover:border-yellow-500' href='https://www.instagram.com' target="_blank"><BsInstagram size={25}></BsInstagram></a>
          <a className='border rounded-full p-2 hover:border-yellow-500' href='https://www.linkedin.com' target="_blank"><BsLinkedin size={25}></BsLinkedin></a>
          <a className='border rounded-full p-2 hover:border-yellow-500' href='https://www.youtube.com' target="_blank"><BsYoutube size={25}></BsYoutube></a>
        </section>
      </section>
      <section className="p-3 text-white flex justify-center items-center bg-black">
        &copy; 2018 - Promo Developers | All Rights Reserved
      </section>
    </section>
  );
}

export default Fotter;
