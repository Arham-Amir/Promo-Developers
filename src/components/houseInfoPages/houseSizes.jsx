'use client'
import { useState } from "react";
import { useSelector } from "react-redux";
import QuantityPerHouse from "@components/houseInfoPages/quantityPerHouse";


const HouseSizes = (props = {}) => {
  const [show, setShow] = useState(false)
  const { loading } = useSelector(state => state.itemManager)

  function handleShowBtn() {
    setShow(!show)
  }
  return (
    <section className='bg-slate-500 text-white p-4 m-4 rounded-3xl border-4 border-black'>
      <button className='hover:text-indigo-800' onClick={handleShowBtn}>
        <h1 className=' p-4 font-bold text-2xl'>{props.children}
          <span className=''> &gt;</span>
        </h1>
      </button>
      {show && <>
        <hr />
        {loading ? <p>Loadingg....</p> :
          Object.keys(props.item).map((el, i) => (
            <QuantityPerHouse key={i} item = {el} value = {props.item[el]} land= {props.children} />
          ))
        }
      </>}
    </section>
  );
}

export default HouseSizes;
