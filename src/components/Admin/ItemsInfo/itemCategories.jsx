'use client'

import { useState } from "react";
import { FiEdit } from 'react-icons/fi'
import { BiSolidSave } from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { fetchItemsHeadings } from '@redux/itemStore';
import { useDispatch } from "react-redux";
import { ItemManagerActions } from "@redux/itemStore";

function ItemCategories(props = {}) {
  const [editNameValue, setEditNameValue] = useState(false)
  const [editPrice, setEditPrice] = useState(false)
  const [name, setName] = useState(props.name)
  const [price, setPrice] = useState(props.pricePU)
  const dispatch = useDispatch();
  function handleEditNameValue() {
    setEditNameValue(prev => !prev)
  }
  function handleEditPrice() {
    setEditPrice(!editPrice)
  }
  function handleNameSaveBtn() {
    dispatch(ItemManagerActions.editName({
      'head': props.head,
      'item': props.item,
      'category': props.category,
      name
    }))
    dispatch(fetchItemsHeadings())
    setEditNameValue(!editNameValue)
  }
  function handlePriceSaveBtn() {
    dispatch(ItemManagerActions.editPrice({
      'head': props.head,
      'item': props.item,
      'category': props.category,
      price
    }))
    dispatch(fetchItemsHeadings())
    setEditPrice(!editPrice)
  }
  function handleDeleteBtn() {
    dispatch(ItemManagerActions.deleteCategory({
      head: props.head,
      item: props.item,
      category: props.category
    }))
    dispatch(fetchItemsHeadings())
  }
  return (<>
    <section className=" flex-1">
      <p className='bg-bg-1 py-2 px-6 rounded-full w-max'>{props.category}</p>
    </section>
    <section className="flex-1 flex items-center flex-row gap-2">
      {editNameValue == false ?
        <section className="flex items-center gap-2 w-max">
          <p className={`bg-bg-1 py-2 px-6 rounded-full`}>{name}</p>
          <button onClick={(e) => handleEditNameValue(e)} ><FiEdit size={20}></FiEdit></button>
        </section>
        :
        <section className="flex items-center gap-2 w-max">
          <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text" />
          <button onClick={handleNameSaveBtn} ><BiSolidSave size={20}></BiSolidSave></button>
          <button onClick={(e) => handleEditNameValue(e)} ><GiCancel size={20}></GiCancel></button>
        </section>
      }
    </section>
    <section className="flex-1 flex items-center flex-row gap-2">
      {editPrice == false ?
        <>
          <p className={`bg-bg-1 py-2 px-6 rounded-full w-max`}>{price}</p>
          <button onClick={handleEditPrice} ><FiEdit size={20}></FiEdit></button>
          <button onClick={handleDeleteBtn} className="pl-5" ><RiDeleteBin5Line size={20}></RiDeleteBin5Line></button>
        </>
        :
        <>
          <input className='focus:outline-none w-max bg-bg-1 py-2 px-6 rounded-full'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text" />
          <button onClick={handlePriceSaveBtn} ><BiSolidSave size={20}></BiSolidSave></button>
          <button onClick={handleEditPrice} ><GiCancel size={20}></GiCancel></button>
        </>
      }
    </section>
  </>);
}

export default ItemCategories;
