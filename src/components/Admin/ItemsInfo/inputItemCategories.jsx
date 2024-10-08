'use client'

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { ItemManagerActions } from '@redux/itemStore';
import { fetchItemsHeadings } from '@redux/itemStore';
import { toast } from 'react-toastify';


function InputItemCategories(props = {}) {
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [cancel, setCancel] = useState(false)
  const [save, setSave] = useState(false)
  const [add, setAdd] = useState(true)

  const dispatch = useDispatch()
  function handleAddBtn() {
    setAdd(false);
    setCancel(true);
    setSave(true)
  }
  function handleSaveBtn() {
    if (category == '' || name == '' || price == 0) {
      toast('Invalid Data, Try Again')
    }
    else {
      dispatch(ItemManagerActions.addCategory(
        {
          'head': props.head,
          'item': props.item,
          category,
          'data': { name, price }
        }))
      dispatch(fetchItemsHeadings())
      setCancel(false);
      setSave(false)
      setAdd(true);
      cleanProps()
    }
  }
  function handleCancelBtn() {
    setCancel(false);
    setSave(false)
    setAdd(true);
    cleanProps()
  }
  function cleanProps(){
    setCategory('')
    setName('')
    setPrice(0)
  }

  return (
    <>
      {
        add == false && <>
          <section className='flex-all-center p-4 gap-24'>
            <section className="basis-1/4 flex justify-start items-center flex-row gap-4">
              <p>
                Category :
              </p>
              <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-full'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="text" />
            </section>
            <section className="basis-1/4 flex justify-start items-center flex-row gap-4">
              <p>
                Name :
              </p>
              <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" />
            </section>
            <section className="basis-1/4 flex justify-start items-center flex-row gap-4">
              <p>
                Price-Per-Unit :
              </p>
              <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-full'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text" />
            </section>
          </section>
          <section className='flex justify-end items-center text-white'>
            <button onClick={handleCancelBtn} className='bg-red-800 py-2 px-6 rounded-full'>Cancel</button>
            <button onClick={handleSaveBtn} className='bg-green-800 py-2 px-6 rounded-full'>Save</button>
          </section>
        </>
      }
      {
        add == true &&
        <section className='flex justify-end items-center'>
          <button onClick={handleAddBtn} className='bg-themeFont text-white font-semibold py-2 px-6 rounded-full'>ADD</button>
        </section >
      }
    </>
  );
}

export default InputItemCategories;
