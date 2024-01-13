'use client'
import { ItemManagerActions, fetchFinishingItems } from "@redux/itemStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const AddItemPage = () => {
  const dispatch = useDispatch();
  const { finishingItems } = useSelector(state => state.itemManager)
  const [item, setItem] = useState('')
  const [itemHead, setItemHead] = useState('Category')

  function handleAddItem() {
    if (item !== '' && itemHead !== 'Category') {
      dispatch(ItemManagerActions.addFinishingItem({ item, itemHead }))
      dispatch(fetchFinishingItems())
      setItem('')
      setItemHead('Category')
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
      <section className="min-h-full">
        <select className="h-full bg-bg-1 rounded-sm p-2" name="itemHead" id="itemHead" value={itemHead} onChange={(e) => setItemHead(e.target.value)}>
          <option value="Category">Select</option>
          {finishingItems["Standard"] && Object.keys(finishingItems["Standard"])?.map((el, i) => {
            return el != "order" && <option key={i} value={el}>{el}</option>
          })}
        </select>
      </section>
      <button onClick={handleAddItem} className='bg-themeFont text-white'>ADD</button>
    </section>
  );
}

export default AddItemPage;
