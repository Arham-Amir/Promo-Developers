import Step1 from "@components/Calculator/step1";


const Page = () => {
  return (
    <section className="bg-[url('/image/calcBg.png')] backdrop-blur-[1px] h-screen
    flex text-white justify-center items-center">
      <Step1 />
    </section>
  );
}

export default Page;
