const Services = () => {
  return (
    <section className="my-8 py-8 bg-white w-screen flex items-center justify-center">
      <section className="p-5 w-[90%] text-black flex flex-col gap-10">
        <section className="flex gap-5 items-center">
          <h1 className="text-3xl font-bold pl-1 font-heading">Services</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <section className="grid grid-cols-2 gap-10">
          <Card img = '/image/services1.jpg' heading = {'LAND REQUIRED'} text = {'We are actively seeking new residential development opportunities across the Midlands region.'} />
          <Card img = '/image/services2.jpg' heading = {'THE DESIGN DIFFERENCE'} text = {'At Promo Developers, we carefully consider each home as if it were our own.'} />
          <Card img = '/image/services3.jpg' heading = {'CUSTOMER CARE'} text = {'Report an issue, find out about your warranty and provide feedback on our service.'} />
          <Card img = '/image/services4.jpg' heading = {'CONTACT US '} text = {'Find out how to get in touch.'} />
        </section>
      </section>
    </section>
  );
}

export default Services;

const Card = (props = {}) => {
  return (
    <section className="hover:-translate-y-3 transiton duration-300 ease-in-out font-themeFont shadow-md flex flex-col gap-3 bg-white">
      <section className={`h-[70vh]`}>
        <img src = {props.img} className="h-full w-full object-cover"></img>
      </section>
      <section className="flex flex-col gap-3 p-5">
        <p className="text-xl font-bold">{props.heading}</p>
        <p className="text-xl">{props.text}</p>
      </section>
    </section>
  );
}


