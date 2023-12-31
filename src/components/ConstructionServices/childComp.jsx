'use client'

import { useState } from "react";

const ChildComp = () => {
  const [img, setimg] = useState("");
  const mainProjects = [
    {
      'name': 'Online Cost Calculator',
      'imageLink': "/constructionServices/1.png",
      'description': "Introducing our user-friendly online Grey Structure Cost Calculator for constructing your new house. Empower yourself to estimate costs independently by choosing the material quality that aligns with your preferences. Enjoy the convenience of a customized cost calculation tailored to your specific construction needs, ensuring transparency and control throughout the process. Build with confidence using our intuitive tool.",
    },
    {
      'name': 'Site Management',
      'imageLink': "/constructionServices/2.png",
      'description': "With our comprehensive 'Site Management' services, we excel in delivering quality labor, efficient material procurement, and expert handling. Ensuring seamless coordination, we prioritize excellence in every aspect of construction, guaranteeing a smooth and successful project execution from start to finish.",
    },
    {
      'name': 'Online Customer Portal',
      'imageLink': "/constructionServices/3.png",
      'description': "Introducing our Online Customer Portal, designed for seamless account management. Users can effortlessly review their account costs, supported by easily accessible and attached invoices. This user-friendly platform ensures transparency and convenience, allowing customers to stay informed about their financial transactions and enabling a hassle-free experience in managing their accounts.",
    },
    {
      'name': 'Time-Line Chart',
      'imageLink': "/constructionServices/4.png",
      'description': "Discover the efficiency of our 'Timeline Chart' a detailed roadmap meticulously crafted by our team. This tool provides a clear, step-by-step schedule, highlighting precisely when each task will be completed by us. Stay informed, track progress eamlessly, and witness the timely and successful execution of your project under our dedicated timeline management.",
    },
    {
      'name': '24/7 Online Camera View',
      'imageLink': "/constructionServices/5.png",
      'description': "Experience the convenience of our 'Online Camera View' allowing you to remotely monitor your project from the comfort of your home. Stay connected with real-time visual updates, ensuring transparency and peace of mind as you witness the progress of your construction project.",
    },
    {
      'name': 'Client Feedback',
      'imageLink': "/constructionServices/6.png",
      'description': "Introducing our dedicated WhatsApp group for streamlined communication. Stay in the loop with daily project updates and provide instant feedback. This interactive platform ensures real-time engagement, fostering transparent communication between our team and clients, ultimately enhancing collaboration and ensuring your project progresses smoothly according to your expectations.",
    },

  ]

  return (
    <section className="flex flex-col gap-12 pb-5 w-screen font-sans">
      <section className="bg-[url('/image/calc.png')] w-full bg-cover py-10 relative">
        <div className="absolute top-0 w-full h-full bg-black/30 z-10 backdrop-blur-[1px]"></div>
        <section className="flex flex-col w-full md:w-4/5 mx-auto">
          <h1 className='w-4/5 text-center p-5 mx-auto font-heading z-20 text-white'>Construction Services</h1>
          <p className="z-20 text-white text-center p-5">Promo Developers is a leading construction firm specializing in providing high-quality construction and contracting services. With a commitment to excellence and a customer-centric approach, we have established a strong reputation in the industry for delivering outstanding results. Our team of experienced professionals and skilled craftsmen work collaboratively to meet our client's unique construction needs</p>
        </section>
      </section>
      <section className="flex flex-col gap-12 w-11/12 md:w-4/5 mx-auto">
        <section className="flex gap-5 items-center">
          <h1 className="pl-1 font-heading">Mission</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <p className="">Our mission is to deliver exceptional construction services by employing innovative techniques, adhering to the highest standards of quality, and fostering strong client relationships. We strive to exceed our clients ' expectations by completing projects on time, within budget, and with the utmost attention to detail</p>
      </section>
      <section className="flex flex-col gap-12 w-11/12 md:w-4/5 mx-auto">
        <h1 className='w-4/5 border text-center mt-5 p-5 mx-auto font-heading'>Services</h1>
        <section className='flex flex-col items-center justify-center gap-5 md:gap-24'>
          {mainProjects.map((prj, i) => {
            return (
              <section className={`p-5 md:p-0 flex flex-col gap-5 md:gap-0 ${i % 2 == 0 ? 'md:flex-row' : 'md:flex-row-reverse'}  items-center w-full relative`}>
                <section onClick={() => {
                  setimg(prj['imageLink'])
                  document.getElementById("model-6").showModal()
                }} className={`w-full md:min-w-[55%] h-[40vh] md:h-[55vh] 2xl:h-[46vh] image-container hover:cursor-zoom-in`}>
                  <img className="object-fill h-full w-full grayscale-[50] hover:grayscale-0 transition-all duration-200" src={prj['imageLink']} />
                </section>
                <Right prj={prj} i={i} />
              </section>
            )
          })}
        </section>
      </section>
      <dialog id="model-6" className="modal min-w-screen min-h-screen">
        <div className="modal-box min-h-[80%] min-w-[80%] py-10 custom-scrollbar z-40">
          <button onClick={() => {
            document.getElementById("model-6").close();
          }} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <section className="flex-all-center flex-col gap-5">
            <img className="object-fit" src={img} alt="map image" />
          </section>
        </div>
      </dialog>
    </section>
  );
}

export default ChildComp;


const Right = (props = {}) => {
  return (
    <section className={`w-full px-5 sm:px-10 py-12 sm:py-16 md:p-0 md:min-w-[42vw] lg:min-w-[55%] z-40 ${props.i % 2 == 0 ? 'md:-translate-x-28 lg:-translate-x-[20%] md:text-right xs:text-left' : 'md:translate-x-28 lg:translate-x-[20%] text-left'} flex flex-col gap-1 2xl:gap-2`}>
      <h2 className="text-themeFont font-bold font-heading">{props.prj['name']}</h2>
      <section className="md:bg-bg-light my-4 md:p-5">
        <p className="text-themeFont md:text-lightFont">{props.prj['description']}</p>
      </section>
    </section>
  );
}
