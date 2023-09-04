'use client'
import { useState } from "react";
import QuantityPerHouse from "@components/Admin/AreasInfo/quantityPerHouse";

const Areas = (props = {}) => {
  const [show, setShow] = useState(false);

  const handleRadioChange = () => {
    setShow(!show);
  };

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleRadioChange} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-light" onClick={handleRadioChange}>
        {props.children}
      </div>
      {show && (
        <div className="collapse-content bg-bg-dark">
          <h1 className="p-4 text-2xl">Quanity :</h1>
          <section className="grid" style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )' }}>
            {
              Object.keys(props.item).map((el, i) => (
                <QuantityPerHouse
                  key={i}
                  item={el}
                  area = {props.area}
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
