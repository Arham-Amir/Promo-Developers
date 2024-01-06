'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, getDate } from "@redux/itemStore";

const AddLastPriceUpdateDate = () => {
  const dispatch = useDispatch();
  const { lastPriceUpdateDate, dateloading } = useSelector(state => state.itemManager)
  const [date, setLastPriceUpdateDate] = useState('')
  function handleAddCategory() {
    dispatch(setDate(date)).then(() => {
      dispatch(getDate())
    })
    setLastPriceUpdateDate('')
  }
  useEffect(() => {
    dispatch(getDate())
  }, []);
  return (
    <section className="text-themeFont flex flex-col gap-3 justify-center items-center w-full">
      {!dateloading && <p>{lastPriceUpdateDate}</p>}
      <section className="flex gap-5 justify-center items-center w-full">
        <input className='focus:outline-none w-[30%] bg-bg-1 py-2 px-6 rounded-sm'
          value={date}
          onChange={(e) => setLastPriceUpdateDate(e.target.value)}
          type="text"
          placeholder="Add Last Updated Price Date" />
        <button onClick={handleAddCategory} className='bg-themeFont text-white'>Save</button>
      </section>
    </section>
  );
}

export default AddLastPriceUpdateDate;
