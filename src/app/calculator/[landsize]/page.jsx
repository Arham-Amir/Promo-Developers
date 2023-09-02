import Constructed from "@components/Calculator/constructed";
const Page = ({params}) => {
  return (
    <section className="relative">
      <Constructed landsize = {params.landsize}></Constructed>
    </section>
  );
}

export default Page;
