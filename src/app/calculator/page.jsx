import Step1 from "@components/Calculator/step1";
import { Suspense } from "react";


const Page = () => {
  return (
    <section className="h-[88vh] w-full flex">
      <section className="bg-[url('/image/calcBg.png')] w-1/2"></section>
      <Suspense fallback={<p>Loading Land Sizes...</p>}>
        <Step1 className="w-1/2 bg-bg-light" />
      </Suspense>
    </section>
  );
}

export default Page;
