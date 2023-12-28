'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAreaName, fetchAreas } from "@redux/itemStore";

const AddAreasInfo = () => {
  const dispatch = useDispatch();
  const [area, setArea] = useState('');


  function handleAddAreaName() {
    dispatch(addAreaName({ 'area': area, value: 'null' })).then(() => {
      dispatch(fetchAreas());
    })
    setArea('');
  }

  return (
    <section className="text-themeFont flex gap-5 justify-center w-full">
      <input
        className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-sm'
        value={area}
        onChange={(e) => setArea(e.target.value)}
        type="text"
        placeholder="Add Area Name"
      />
      <button onClick={handleAddAreaName} className='text-white font-semibold bg-themeFont'>ADD</button>
    </section>
  );
}

export default AddAreasInfo;
