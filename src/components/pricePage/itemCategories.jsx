'use client'

import { useState } from "react";
import { FiEdit } from 'react-icons/fi'
import { BiSolidSave } from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { fetchCategories } from '@redux/itemStore';
import { useDispatch } from "react-redux";
import { ItemManagerActions } from "@redux/itemStore";
import { useRouter } from "next/navigation";


function ItemCategories(props = {}) {
  const [editNameValue, setEditNameValue] = useState(false)
  const [editPrice, setEditPrice] = useState(false)
  const [name, setName] = useState(props.name)
  const [price, setPrice] = useState(props.pricePU)
  const router = useRouter();
  const dispatch = useDispatch();
  function handleEditNameValue() {
    setEditNameValue(prev => !prev)
    console.log(editNameValue)
  }
  function handleEditPrice() {
    setEditPrice(!editPrice)
  }
  function handleNameSaveBtn() {
    dispatch(ItemManagerActions.editName({
      'item': props.item,
      'category': props.category,
      name
    }))
    dispatch(fetchCategories)
    setEditName(!editNameValue)
  }
  function handlePriceSaveBtn() {
    dispatch(ItemManagerActions.editPrice({
      'item': props.item,
      'category': props.category,
      price
    }))
    dispatch(fetchCategories)
    setEditPrice(!editPrice)
  }
  function handleDeleteBtn() {
    dispatch(ItemManagerActions.deleteCategory({
      item: props.item,
      category: props.category
    }))
    router.push('/dashboard')
  }
  return (
    <section className={`${props.className} w-full flex items-center justify-start p-4`}>
      <section className="flex-1 flex justify-start items-center flex-row gap-4">
        <h1>
          Category :
        </h1>
        <p className='bg-indigo-800 py-2 px-6 rounded-full'>{props.category}</p>
      </section>
      <section className="flex-1 flex justify-start items-center flex-row gap-4">
        <section>
          <h1>
            Name :
          </h1>
        </section>
        <section className="flex items-center gap-2">
          {editNameValue == false ?
            <section className="flex items-center gap-2">
              <p className={`bg-indigo-800 py-2 px-6 rounded-full`}>{name}</p>
              <button onClick={(e) => handleEditNameValue(e)} ><FiEdit size={20}></FiEdit></button>
            </section>
            :
            <section className="flex items-center gap-2">
              <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" />
              <button onClick={handleNameSaveBtn} ><BiSolidSave size={20}></BiSolidSave></button>
              <button onClick={(e) => handleEditNameValue(e)} ><GiCancel size={20}></GiCancel></button>
            </section>
          }
        </section>
      </section>
      <section className="flex-1 flex justify-start items-center flex-row gap-4">
        <h1>
          Price-Per-Unit :
        </h1>
        <section className="flex items-center gap-2">
          {editPrice == false ?
            <>
              <p className={`bg-indigo-800 py-2 px-6 rounded-full`}>{price}</p>
              <button onClick={handleEditPrice} ><FiEdit size={20}></FiEdit></button>
              <button onClick={handleDeleteBtn} className="pl-5" ><RiDeleteBin5Line size={20}></RiDeleteBin5Line></button>
            </>
            :
            <>
              <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text" />
              <button onClick={handlePriceSaveBtn} ><BiSolidSave size={20}></BiSolidSave></button>
              <button onClick={handleEditPrice} ><GiCancel size={20}></GiCancel></button>
            </>
          }
        </section>
      </section>

    </section>
  );
}

export default ItemCategories;
