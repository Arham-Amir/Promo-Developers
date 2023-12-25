import Link from "next/link";

const Services = () => {
  return (
    <section className="my-8 py-8 bg-white w-screen flex items-center justify-center">
      <section className="p-5 w-[90%] text-black flex flex-col gap-10">
        <section className="flex gap-5 items-center">
          <h1 className="pl-1 font-heading text-bg-dark">Services</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Link href="/construction-services">
            <Card img='/image/services1.jpg' heading={'Construction Services'} text={"Our mission is to deliver exceptional construction services by employing innovative techniques, adhering to the highest standards of quality, and fostering strong client relationships. We strive to exceed our client's expectations by completing projects on time, within budget, and with the utmost attention to detail"} />
          </Link>
          <Link href="/material-estimation">
            <Card img='/image/services2.jpg' heading={'Material Estimation'} text={"We will provide you Construction takeoff Estimation, Material Take off and Cost Estimation for residential and commercial projects"}
            />
          </Link>
        </section>
      </section>
    </section>
  );
}

export default Services;

const Card = (props = {}) => {
  return (
    <section className="hover:-translate-y-3 transiton duration-300 ease-in-out shadow-md flex flex-col gap-3 bg-white">
      <section className={`h-[50vh] md:h-[70vh]`}>
        <img src={props.img} className="h-full w-full object-cover"></img>
      </section>
      <section className="flex flex-col gap-3 p-5">
        <h3 className="font-themeFont">{props.heading}</h3>
        <p className="line-clamp-2">{props.text}</p>
      </section>
    </section>
  );
}


