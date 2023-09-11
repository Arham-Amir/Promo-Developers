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
    <section className="flex flex-col">
      <section className="h-[50vh] w-full bg-[url('/image/calc.png')] bg-cover">
        <Step0 setArea={(q) => setSelectedArea(q)}
          setLand={(q) => setSelectedLand(q)} />
      </section>
      {selectedArea != '' &&
        <Step1 area={selectedArea} />
      }
      {selectedLand != '' &&
        <Step1_1 land={selectedLand} />
      }
    </section>
  );
}

export default CalculatorInfoPage;
