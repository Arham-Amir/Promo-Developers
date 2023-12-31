'use client'

import LazyImage from "./lazyImage";

const UpComingEvent = () => {
  return (
    <section className='relative'>
      <button onClick={() => document.getElementById("upComingEvent").showModal()}
      className="p-0 shaky-component fixed bottom-10 border-4 left-4 z-40 bg-bg-dark border-themeFont w-fit rounded-full">
        {/* <p className='text-green-500 text-xs'>UpComingEvent</p> */}
        <LazyImage
          className="w-[35px] h-[35px] object-cover rounded-full"
          src={"/image/event.jpg"}
        />
      </button>
      <dialog id={`upComingEvent`} className="m-auto modal min-w-[80vw] max-w-[80vw] h-[85vh] md:h-[90vh]">
        <div className="modal-box flex flex-col gap-5 items-center w-full h-full">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
          </form>
          <div className="modal-box p-0 rounded-none overflow-hidden w-full h-full bg-bg-dark flex flex-col justify-between relative">
            <LazyImage
              className="w-full h-full object-fill"
              src={"/image/event.jpg"}
            />
            <section className="h-max w-full flex flex-col md:flex-row justify-between items-center absolute bottom-0 left-0 bg-white/50 backdrop-blur-sm">
              <LazyImage
                className="w-[80px] md:w-[100px] m-5  object-contain "
                src={"/logos/promodevelopers.gif"}
              />
              <section className="p-2 flex flex-col gap-1">
                <section className="flex mb-2 items-center justify-center flex-col">
                  <h1 className="text-xs ms:text-sm text-center">We Are Coming At:</h1>
                  <h3 className=" uppercase font-heading font-extrabold">COTTAGE Industry EXPO-24</h3>
                </section>
                <section className="flex flex-col gap-1 items-center md:items-end justify-center">
                  <h1 className="font-bold text-xs ms:text-sm">Venue:</h1>
                  <p className="text-xs ms:text-sm">Expo Center Johar Town, Lahore</p>
                </section>
                <section className="flex gap-2 justify-center md:justify-end">
                  <h1 className="font-bold text-xs md:text-sm">March 7, 8, 9</h1>
                </section>
                <section className="flex gap-2 justify-center md:justify-end">
                  <h1 className="font-bold text-xs ms:text-sm">2024</h1>
                </section>
                <section className="flex flex-col md:flex-row gap-1 items-center justify-center md:justify-end">
                  <h1 className="font-bold text-xs ms:text-sm">Time:</h1>
                  <p className="text-xs ms:text-sm">12 PM to 8 PM</p>
                </section>
              </section>
            </section>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default UpComingEvent;
