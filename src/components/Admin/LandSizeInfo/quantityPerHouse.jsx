'use client'

import { useEffect, useState } from "react";
import { FiEdit } from 'react-icons/fi'
import { BiSolidSave } from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions } from "@redux/itemStore";

const QuantityPerHouse = (props = {}) => {
  const [quantity, setQuantity] = useState(props.value)
  const [editValue, setEditValue] = useState(false)
  const { land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  function handleEditValue(e) {
    setEditValue(!editValue)
  }
  function handleSaveBtn(e) {
    console.log(props)
    dispatch(ItemManagerActions.editQuantity({
      'item': props.item,
      'land': props.land,
      quantity
    }))
    props.fetchLandFunc()
    setEditValue(!editValue)
  }
  useEffect(()=>{
    setQuantity(land[props.land][props.item])
  },[land])
  return (
    <section className="flex items-center flex-row gap-4 p-4 xs:text-xs sm:text-base w-fit">
      <h1 className="w-max">
        {props.item} :
      </h1>
      <section className="flex items-center gap-2">
        {editValue == false ?
          <>
            <p className={`bg-bg-light py-2 px-6 rounded-full`}>{quantity}</p>
            <button onClick={handleEditValue} ><FiEdit size={20}></FiEdit></button>
          </>
          :
          <>
            <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="text" />
            <button onClick={handleSaveBtn} ><BiSolidSave size={20}></BiSolidSave></button>
            <button onClick={handleEditValue} ><GiCancel size={20}></GiCancel></button>
          </>
        }
      </section>
    </section>
  );
}

export default QuantityPerHouse;