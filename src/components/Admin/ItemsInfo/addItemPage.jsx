'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchItemsHeadings } from "@redux/itemStore";
import { useRouter } from "next/navigation";

const AddItemPage = () => {
  const dispatch = useDispatch();
  const { headings } = useSelector(state => state.itemManager)
  const [item, setItem] = useState('')
  const [itemHead, setItemHead] = useState('')
  const [show, setShow] = useState(false)
  const router = useRouter()
  function handleAddItem() {
    dispatch(ItemManagerActions.addItem({item, itemHead}))
    setItem('')
    router.push('/admin/items')
  }
  useEffect(() => {
   dispatch(fetchItemsHeadings())
  }, []);
  return (
    <section className="text-white flex gap-5 justify-center">
      <input className='focus:outline-none w-[40%] bg-bg-light py-2 px-6 rounded-sm'
        value={item}
        onChange={(e) => setItem(e.target.value)}
        type="text"
        placeholder="Add Item" />
      <div className="w-max collapse collapse-arrow bg-bg-light text-themeFont rounded-none">
        <input onChange={()=>{}} type="radio" name="my-accordion-100" checked={show} onClick={()=> setShow(!show)} />
        <div className="collapse-title text-xl font-medium border-b border-bg-dark">
          Category
        </div>
        <div className="collapse-content flex flex-col items-start">
          {Object.keys(headings).map((el, i)=>{
            return <button onClick={()=> {setItemHead(el); console.log(itemHead); setShow(false)}} key={i} className="w-fit hover:scale-105">{el}</button>
          })}
        </div>
      </div>
      <button onClick={handleAddItem} className='bg-bg-light text-themeFont py-2 px-6 rounded-sm'>ADD</button>
    </section>
  );
}

export default AddItemPage;
