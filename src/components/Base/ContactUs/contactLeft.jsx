'use client'

import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const ContactLeft = (props = {}) => {
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_message, setUserMessage] = useState('');

  const handleClick = () => {
    if (user_name === '' || user_email === '' || user_message === '') {
      toast.error('Please Complete All Form Fields First.');
    } else {
      emailjs
        .send(
          'service_795z05c',
          'template_yxt6z4f',
          {
            user_name,
            user_email,
            user_message,
          },
          '_-54h6-fJGYFNR1E8'
        )
        .then(
          function (response) {
            toast.success('Your Response Sent Successfully!');
          },
          function (error) {
            toast.error('Your Response Sending Process Failed!');
          }
        );
      setUserName('');
      setUserEmail('');
      setUserMessage('');
    }
  };

  return (
    <section className={`${props.className} bg-[#e0dede] md:rounded-l-lg`}>
      <section className='w-3/5 mx-auto my-10 flex flex-col items-center gap-5 text-themeFont'>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Full_Name">FULL NAME</label>
          <input onChange={(e) => setUserName(e.target.value)}
            value={user_name}
            id="Full_Name" className='placeholder:text-themeFont placeholder:opacity-70  border-2 bg-bg h-10 py-5 px-2 focus-within:outline-none rounded-lg' type="text" placeholder='Full Name' />
        </section>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Email">EMAIL</label>
          <input onChange={(e) => setUserEmail(e.target.value)}
            value={user_email}
            className='placeholder:text-themeFont placeholder:opacity-70 w-full border-2 bg-bg h-10 py-5 px-2 focus-within:outline-none rounded-lg' type="email" name="email" id="email" placeholder='Email' />
        </section>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Message">MESSAGE</label>
          <textarea onChange={(e) => setUserMessage(e.target.value)}
            value={user_message}
            className='w-full border-2 bg-bg h-[100px] p-2 focus-within:outline-none rounded-lg' name="message" cols="30" rows="10" placeholder='Message' id='Message'></textarea>
        </section>
        <button onClick={handleClick} className='py-3 px-7 mt-2 w-full border-4 bg-themeFont hover:bg-bg-dark text-white rounded-full'>Submit</button>
      </section>
    </section>
  );
}

export default ContactLeft;
