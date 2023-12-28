'use client'

import { SiTruenas } from "react-icons/si";
import { TiTickOutline } from "react-icons/ti";

const ChildComp = () => {
  const services = [
    "Excavation or Earthworks",
    "Masonry",
    "Plaster",
    "Concrete",
    "Structure",
    "BBS",
    "Window & door",
    "Paint",
    "Wood work ",
    "Electric work",
    "Plumbing work",
  ]
  const requirements = [
    ["Comprehensive Plans", "Receive detailed plans customized to your specific construction requirements, ensuring a comprehensive approach to your project."],
    ["Precise Architectural Drawings", "Benefit from meticulously crafted drawings that provide accurate visualizations, aiding in a clear understanding of the project's architectural aspects."],
    ["Structured Drawings", "Ensure a solid foundation with structured drawings that prioritize stability and durability, laying the groundwork for a successful construction endeavor."],
    ["MEP Drawings", "Experience seamless integration of mechanical, electrical, and plumbing systems through meticulously designed MEP drawings, optimizing the functionality of your project."],
    ["Finishing Drawings", "Elevate the aesthetic appeal of your residential or commercial space with finishing drawings that focus on meticulous detailing, adding the perfect final touch to your construction project."]
  ]

  return (
    <section className="flex flex-col gap-16 pb-5 w-screen font-sans">
      <section className="bg-[url('/image/calc.png')] w-full bg-cover py-10 relative">
        <div className="absolute top-0 w-full h-full bg-black/30 z-10 backdrop-blur-[1px]"></div>
        <section className="flex flex-col w-full md:w-4/5 mx-auto">
          <h1 className='w-4/5 text-center p-5 mx-auto font-heading z-20 text-white'>Material Estimation</h1>
          <p className="z-20 text-white text-center p-5">Promo Developers specializes in delivering comprehensive construction solutions, offering precise services such as Construction Takeoff Estimation, Material Takeoff, and Cost Estimation tailored for both residential and commercial projects. Our expertise ensures accurate planning and budgeting, ensuring the success of your construction endeavors.
          </p>
        </section>
      </section>
      <section className="flex flex-col gap-12 w-11/12 sm:w-4/5 mx-auto text-themeFont">
        <section className="flex gap-5 items-center">
          <h1 className="pl-1 font-heading">Services</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <section className='w-full mx-auto flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center'>
          {services.map((e, i) => (
            <section key={i} className={`w-full sm:w-auto flex`}>
              <section className='p-4 w-full sm:w-fit flex flex-row bg-bg-1 gap-4 items-center rounded-xl'>
                <SiTruenas className='min-w-[25px] min-h-[25px]' />
                <p className=''>{e}</p>
              </section>
            </section>
          ))}
        </section>
      </section>
      <section className="flex flex-col gap-12 w-11/12 md:w-4/5 mx-auto text-themeFont">
        <section className="flex gap-5 items-center">
          <h1 className="pl-1 font-heading min-w-fit">Client Requirements</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        {requirements.map((e, i) => (
          <section className='flex gap-2 items-start md:hover:scale-110 transition duration-300' key={i}>
            <TiTickOutline className='text-themeFont text-xl' />
            <section className="flex gap-1 items-start justify-start flex-col">
              <p className="font-bold min-w-fit">{e[0]}:</p>
              <p >{e[1]}</p>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}

export default ChildComp;
