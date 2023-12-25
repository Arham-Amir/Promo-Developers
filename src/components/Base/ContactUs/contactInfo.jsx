
const ContactInfo = (props = {}) => {
  return (
    <section className='flex flex-col items-center gap-3'>
      {props.children}
    </section>
  );
}

export default ContactInfo;
