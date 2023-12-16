
const ContactRight = (props = {}) => {
  return (
    <section className={`${props.className} shadow-2xl`}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3403.721806861616!2d74.20761147560876!3d31.449324774246577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDI2JzU3LjYiTiA3NMKwMTInMzYuNyJF!5e0!3m2!1sen!2s!4v1691953867712!5m2!1sen!2s"
        className="w-full h-full md:rounded-r-2xl"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
}

export default ContactRight;

