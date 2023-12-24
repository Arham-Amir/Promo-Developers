'use client'
import { useState } from "react";
import QuantityPerHouse from "@components/Admin/AreasInfo/quantityPerHouse";
import { ItemManagerActions, fetchAreas } from "@redux/itemStore";
import { useDispatch } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";

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
  function handledeletebutton(e) {
    e.stopPropagation();
    dispatch(ItemManagerActions.deleteLandSize({ 'area': props.area, 'land': props.children }));
    dispatch(fetchAreas());
  }

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleRadioChange} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center" onClick={handleRadioChange}>
        {props.children}
        <button className='z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </div>
      {show && (
        <div className="collapse-content bg-white">
          <section className="flex mt-5 mx-4 gap-10 items-center">
            <input
              className='focus:outline-none h-[70%] w-[40%] bg-bg-1 py-2 px-3 rounded-sm'
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              type="text"
              placeholder="Add Square Feet"
            />
            <button onClick={handleSquareFeet} className='text-white font-semibold bg-themeFont py-2 px-6 rounded-sm'>ADD</button>
          </section>
          <section className="flex gap-5 items-center">
            <h1 className="p-4 text-2xl">Square Feet :</h1>
            <p className="text-2xl">{props.item["squareFeet"] || 0}</p>
          </section>
          <h3 className="p-4">Quanity Info:-</h3>
          <section className="flex gap-10 flex-wrap" >
            {
              Object.keys(props.item).map((el, i) => {
                {
                  return el != "order" && <QuantityPerHouse
                    key={i}
                    item={el}
                    area={props.area}
                    value={props.item[el]}
                    land={props.children}
                  />
                }
              })
            }
          </section>
        </div>
      )}
    </div>
  );
}

export default Areas;
