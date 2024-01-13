'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFinishingItemsHeading, fetchFinishingItems } from "@redux/itemStore";

const AddCategoriesPage = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState('')
  function handleAddCategory() {
    dispatch(addFinishingItemsHeading(item)).then(()=>{
      dispatch(fetchFinishingItems())
    })
    setItem('')
  }

  return (
    <section className="text-themeFont flex gap-5 justify-center w-full">
      <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-sm'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        placeholder="Add Category" />
      <button onClick={handleAddCategory} className='bg-themeFont text-white'>ADD</button>
    </section>
  );
}

export default AddCategoriesPage;
