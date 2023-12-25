import { ImWhatsapp } from 'react-icons/im';

const ContactPopUpBtn = () => {
  return (
    <section className='relative'>
      <button className="fixed bottom-5 right-5 z-40 bg-transparent animate-bounce">
        <a href={'https://wa.me/+923004439445'} target='_blank'><ImWhatsapp className='text-green-500' size={40} /></a>
      </button>
    </section>
  );
};

export default ContactPopUpBtn;
