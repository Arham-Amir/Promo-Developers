'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ItemManagerActions, fetchFinishingItems } from "@redux/itemStore";
import { toast } from 'react-toastify';

const AddItemPage = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState('')

  function handleAddItem() {
    if (item !== '') {
      dispatch(ItemManagerActions.addFinishingItem({ item }))
      dispatch(fetchFinishingItems())
      setItem('')
    }
    else {
      toast.error("Enter Both Input Field First");
    }
  }

  return (
    <section className="text-themeFont flex gap-5 justify-center w-full">
      <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-sm'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        placeholder="Add Item" />
      <button onClick={handleAddItem} className='bg-themeFont text-white'>ADD</button>
    </section>
  );
}

export default AddItemPage;
