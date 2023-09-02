'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ItemManagerActions } from "@redux/itemStore";
import { useRouter } from "next/navigation";

const AddCategoriesPage = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState('')
  const router = useRouter()
  function handleAddCategory() {
    dispatch(ItemManagerActions.addItemsHeading(item))
    setItem('')
    router.push('/admin/categories')
  }

  return (
    <section className="text-white flex gap-5 justify-center my-10">
      <input className='focus:outline-none w-[40%] bg-bg-light py-2 px-6 rounded-sm'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        placeholder="Add Category" />
      <button onClick={handleAddCategory} className='bg-bg-light text-themeFont py-2 px-6 rounded-sm'>ADD</button>
    </section>
  );
}

export default AddCategoriesPage;
