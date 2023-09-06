'use client'
import Step0 from "@components/Calculator/step0";
import Step1 from "@components/Calculator/step1";
import { Suspense, useState, useEffect } from "react";

const CalculatorInfoPage = () => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    console.log(query)
  }, [query])
  return (
    <section className="flex">
      <section className="w-[40%]">
        <Step0 setQueryData={(q) => setQuery(q)} />
      </section>
      <section className="w-[60%] h-[88vh] flex justify-center items-center relative">
        <section
          className="absolute inset-0 bg-[url('/image/calcBg.png')] opacity-80"
          style={{
            backgroundImage: `url('/image/calcBg.png')`,
          }}
        ></section>
        {query && <Step1 area={query} className="w-1/2" />}
      </section>
    </section>
  );
}

export default CalculatorInfoPage;
