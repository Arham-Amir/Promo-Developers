import PersonCard from "@components/Home/personCard";
const AboutUs = () => {
  return (
    <section id="aboutus">
      <section className="flex flex-col items-center gap-5 w-4/5 mx-auto my-10 text-lightFont">
        <h1 className="text-4xl font-bold ">About Us</h1>
        <p className="md:w-3/5 text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque temporibus odio natus asperiores illum ab quia blanditiis! </p>
        <section className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-6">
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </section>
      </section>
    </section>
  );
}

export default AboutUs;
