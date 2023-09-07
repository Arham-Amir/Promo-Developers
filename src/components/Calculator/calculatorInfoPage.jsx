'use client'
import Step0 from "@components/Calculator/step0";
import Step1 from "@components/Calculator/step1";
import Step1_1 from "@components/Calculator/step1_1";
import { Suspense, useState, useEffect } from "react";

const CalculatorInfoPage = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedLand, setSelectedLand] = useState('');

  useEffect(() => {
  }, [selectedArea])
  return (
    <section className="flex">
      <section className="w-[40%]">
        <Step0 setArea={(q) => setSelectedArea(q)}
        setLand={(q) => setSelectedLand(q)} />
      </section>
      <section className="w-[60%] h-[88vh] flex justify-center items-center relative">
        <section
          className="absolute inset-0 bg-[url('/image/calcBg.png')] opacity-80"
          style={{
            backgroundImage: `url('/image/calcBg.png')`,
          }}
        ></section>
        {selectedArea != '' &&
          <Step1 area={selectedArea} />
        }
        {selectedLand != '' &&
          <Step1_1 land={selectedLand} />
        }
      </section>
    </section>
  );
}

export default CalculatorInfoPage;
