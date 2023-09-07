'use client'
import { useState } from "react";
import QuantityPerHouse from "@components/Admin/AreasInfo/quantityPerHouse";
import { ItemManagerActions } from "@redux/itemStore";
import { useDispatch } from "react-redux";

const Areas = (props = {}) => {
  const [squareFeet, setSquareFeet] = useState(0)
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const handleRadioChange = () => {
    setShow(!show);
  };
  function handleSquareFeet() {
    dispatch(ItemManagerActions.editSqFeet({
      'area': props.area,
      'land': props.children,
      squareFeet
    }))
}

return (
  <div className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
    <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleRadioChange} />
    <div className="max-w-full collapse-title text-2xl font-bold bg-bg-light" onClick={handleRadioChange}>
      {props.children}
    </div>
    {show && (
      <div className="collapse-content bg-bg-dark">
        <section className="flex mt-5 mx-4 gap-10 items-center">
          <input
            className='focus:outline-none h-[70%] w-[40%] bg-slate-600 py-2 px-3 rounded-sm'
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            type="text"
            placeholder="Add Square Feet"
          />
          <button onClick={handleSquareFeet} className='text-themeFont font-semibold bg-bg-light py-2 px-6 rounded-sm'>ADD</button>
        </section>
        <section className="flex gap-5 items-center">
          <h1 className="p-4 text-2xl">Square Feet :</h1>
          <p className="text-2xl">{squareFeet}</p>
        </section>
        <h1 className="p-4 text-2xl">Quanity :</h1>
        <section className="grid" style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )' }}>
          {
            Object.keys(props.item).map((el, i) => (
              <QuantityPerHouse
                key={i}
                item={el}
                area={props.area}
                value={props.item[el]}
                land={props.children}
              />
            ))
          }
        </section>
      </div>
    )}
  </div>
);
}

export default Areas;
