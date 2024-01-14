'use client'

import Draggable from "react-draggable";
import LazyImage from "./lazyImage";

const PalestinePoster = () => {
  return (
    <section className='relative'>
      {/* <Draggable
        defaultPosition={{ x: 0, y: 0 }}
      > */}
      <button onClick={() => document.getElementById("palestine").showModal()}
        className="p-0 fixed bottom-28 left-4 z-30 w-16 h-44 side-right">
        <LazyImage
          className="w-full h-full object-cover border border-themeFont object-left-top"
          src={"/image/event.jpg"}
        />
      </button>
      {/* </Draggable> */}

      <dialog id={`palestine`} className="m-auto modal min-w-[80vw] max-w-[80vw] h-[85vh] md:h-[90vh]">
        <div className="modal-box flex flex-col gap-5 items-center w-full h-full">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
          </form>
          <div className="p-0 modal-box w-full min-h-[90vh] h-auto">
            <LazyImage
              className="w-full h-full object-fill"
              src={"/image/event.jpg"}
            />
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default PalestinePoster;
