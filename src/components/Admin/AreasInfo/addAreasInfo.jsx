'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ItemManagerActions, fetchAreas } from "@redux/itemStore";

const AddAreasInfo = () => {
  const dispatch = useDispatch();
  const [area, setArea] = useState('');


  function handleAddAreaName() {
    dispatch(ItemManagerActions.addAreaName({ area, value: 'null' }));
    dispatch(fetchAreas)
    setArea('');
  }

  return (
    <section className="text-white flex gap-5 justify-center">
      <input
        className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-sm'
        value={area}
        onChange={(e) => setArea(e.target.value)}
        type="text"
        placeholder="Add Area Name"
      />
      <button onClick={handleAddAreaName} className='text-themeFont font-semibold bg-bg-light py-2 px-6 rounded-sm'>ADD</button>
    </section>
  );
}

export default AddAreasInfo;
