'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ItemManagerActions } from "@redux/itemStore";
import { useRouter } from "next/navigation";

const AddItemPage = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState('')
  const router = useRouter()
  function handleAddItem() {
    dispatch(ItemManagerActions.addItem(item))
    router.push('/dashboard')
  }

  return (
    <section className="text-white flex gap-5">
      <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text" />
      <button onClick={handleAddItem} className='bg-indigo-800 py-2 px-6 rounded-full'>ADD</button>
    </section>
  );
}

export default AddItemPage;
