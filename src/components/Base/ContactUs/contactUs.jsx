'use client'

import { MdLocationPin } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { SiMinutemailer } from 'react-icons/si'
import { BiWorld } from 'react-icons/bi'
import ContactLeft from "@components/Base/ContactUs/contactLeft";
import ContactRight from "@components/Base/ContactUs/contactRight";
import ContactInfo from "@components/Base/ContactUs/contactInfo";

const ContactUs = () => {
  return (
    <section id='contactus' className='h-auto py-10 bg-bg text-themeFont'>
      <h1 className='text-5xl font-bold text-themeFont flex-all-center mb-4 font-heading'>Contact Us</h1>
      <section className='w-5/6 mx-auto py-5
      flex md:flex-row flex-col gap-x-4 md:gap-0'>
        <ContactLeft className='md:basis-3/5' />
        <ContactRight className='xs:h-[250px] md:h-auto md:basis-2/5' />
      </section>
      <section className="mt-6 grid w-5/6 h-full mx-auto lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 xs:gap-6">
        <ContactInfo>
          <MdLocationPin size={54} className='bg-themeFont text-white rounded-full p-3' />
          <p className='text-sm w-fit text-center font-semibold  flex flex-col'>Address: <span className='font-normal'>60-J Block, DHA EME Sector, Multan Road, Lahore, Pakistan</span></p>
        </ContactInfo>
        <ContactInfo>
          <BiWorld size={54} className='bg-themeFont text-white rounded-full p-3' />
          <p className='text-sm w-fit text-center font-semibold  flex flex-col'>Website: <span className='font-normal'>www.promodevelopers.com</span></p>
        </ContactInfo>
        <ContactInfo>
          <SiMinutemailer size={54} className='bg-themeFont text-white rounded-full p-3' />
          <p className='text-sm w-fit text-center font-semibold  flex flex-col'>Email: <span className='font-normal'>promoestateanddeveloper@gmail.com</span></p>
        </ContactInfo>
        <ContactInfo>
          <FaPhoneAlt size={54} className='bg-themeFont text-white rounded-full p-3' />
          <p className='text-sm w-fit text-center font-semibold  flex flex-col'>Whatsapp: <span className='font-normal'>+92 300 4439445</span></p>
        </ContactInfo>

      </section>
    </section>
  );
}

export default ContactUs;
