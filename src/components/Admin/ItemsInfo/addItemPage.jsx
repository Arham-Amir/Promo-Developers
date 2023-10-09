'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchItemsHeadings } from "@redux/itemStore";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const AddItemPage = () => {
  const dispatch = useDispatch();
  const { headings } = useSelector(state => state.itemManager)
  const [item, setItem] = useState('')
  const [itemHead, setItemHead] = useState('Category')
  const [show, setShow] = useState(false)
  const router = useRouter()

  function handleAddItem() {
    if (item !== '' && itemHead !== 'Category') {
      dispatch(ItemManagerActions.addItem({ item, itemHead }))
      dispatch(fetchItemsHeadings())
      setItem('')
      setItemHead('Category')
      router.push('/admin/items')
    }
    else {
      toast.error("Enter Both Input Field First");
    }
  }
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, []);
  return (
    <section className="text-themeFont flex gap-5 justify-center">
      <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-sm'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        placeholder="Add Item" />
      <div className="w-max collapse collapse-arrow bg-bg-1 text-themeFont rounded-none">
        <input onChange={() => { }} type="radio" name="my-accordion-100" checked={show} onClick={() => setShow(!show)} />
        <div className="collapse-title text-xl font-medium">
          {itemHead}
        </div>
        <div className="collapse-content flex flex-col items-start pt-2 border-t border-bg-dark">
          {Object.keys(headings).map((el, i) => {
            return <button onClick={() => { setItemHead(el); setShow(false) }} key={i} className="w-full text-start hover:scale-105 pl-1 border-l border-bg-dark">{el}</button>
          })}
        </div>
      </div>
      <button onClick={handleAddItem} className='bg-themeFont text-white py-2 px-6 rounded-sm'>ADD</button>
    </section>
  );
}

export default AddItemPage;
