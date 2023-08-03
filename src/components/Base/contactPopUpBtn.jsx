'use client'

import React, { useState } from 'react';
import { ImWhatsapp } from 'react-icons/im';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/system';

const ContactPopUpBtn = () => {
  const [showNumber, setShowNumber] = useState(false);
  const CTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
  ))(`
      color: white;
      background-color: #e9bcb7;
      background-image: linear-gradient(315deg, #e9bcb7 0%, #29524a 74%);
      font-size: 1.2rem;
      padding: 15px;
  `);


  function handleWhatsappClick(e) {
    setShowNumber(!showNumber);
  }

  return (
    <section className='relative'>
      <button className="fixed bottom-5 right-5 z-20 bg-transparent animate-bounce">
        <CTooltip onClick={handleWhatsappClick} open={showNumber} placement="top-start" title="&#127477;&#127472; +92 3001114461" className='' arrow >
          <p><ImWhatsapp className='text-green-500' size={35} /></p>
        </CTooltip>
      </button>
    </section>
  );
};

export default ContactPopUpBtn;
