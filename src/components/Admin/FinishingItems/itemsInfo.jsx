'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions, fetchFinishingItems, fetchItemsHeadings } from '@redux/itemStore';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi';
import { BiSolidSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';

const ItemInfo = (props = {}) => {
  const { finishingItems } = useSelector(state => state.itemManager)
  const [editorder, seteditorder] = useState(false)
  const [order, setorder] = useState(finishingItems[props.head][props.children]['order'] || 0)
  const [editprice, seteditprice] = useState(false)
  const [price, setprice] = useState(finishingItems[props.head][props.children]['price'] || 0)
  const dispatch = useDispatch()

  function handlePriceSaveBtn(e) {
    e.stopPropagation()
    dispatch(ItemManagerActions.editFinishingItemPrice({
      'head': props.head,
      'item': props.children,
      price
    }))
    dispatch(fetchFinishingItems())
    seteditprice(!editprice)
  }
  function handleOrderSaveBtn(e) {
    e.stopPropagation()
    dispatch(ItemManagerActions.editFinishingItemOrder({
      'item': props.children,
      order
    }))
    dispatch(fetchFinishingItems())
    seteditorder(!editorder)
  }
  function handledeletebutton(e) {
    const confirmed = window.confirm("Are you sure you want to delete from all categories?");
    if (confirmed) {
      e.stopPropagation();
      dispatch(ItemManagerActions.deleteFiishingItem({ 'item': props.children }));
      dispatch(fetchFinishingItems());
    }
  }

  return (
    <div className="max-w-full text-2xl font-bold bg-bg-1 flex justify-between items-center p-4">
      <p>{props.children}</p>
      <section className='flex z-20 gap-5'>
        <section className='p-2 border border-themeFont flex justify-center items-center gap-1'>
          {editprice == false ?
            <section className="flex items-center gap-2 w-fit">
              <p>Price: {finishingItems[props.head][props.children]['price'] || 0}</p>
              <button className='p-0' onClick={(e) => { e.stopPropagation(); seteditprice(prev => !prev) }} ><FiEdit size={20}></FiEdit></button>
            </section>
            :
            <section className="flex items-center justify-center gap-2 max-w-fit">
              <input className='focus:outline-none w-[40%] bg-bg p-2 rounded-full text-xs'
                value={price}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setprice(e.target.value)}
                type="text" />
              <button className='p-0' onClick={(e) => handlePriceSaveBtn(e)} ><BiSolidSave size={20}></BiSolidSave></button>
              <button className='p-0' onClick={(e) => { e.stopPropagation(); seteditprice(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
            </section>
          }
        </section>
        <section className='p-2 border border-themeFont flex justify-center items-center gap-1'>
          {editorder == false ?
            <section className="flex items-center gap-2 w-fit">
              <p>Order: {finishingItems[props.head][props.children]['order'] || 0}</p>
              <button className='p-0' onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><FiEdit size={20}></FiEdit></button>
            </section>
            :
            <section className="flex items-center justify-center gap-2 max-w-fit">
              <input className='focus:outline-none w-[20%] bg-bg p-2 rounded-full text-xs'
                value={order}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setorder(e.target.value)}
                type="text" />
              <button className='p-0' onClick={(e) => handleOrderSaveBtn(e)} ><BiSolidSave size={20}></BiSolidSave></button>
              <button className='p-0' onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
            </section>
          }
        </section>
        <button className='p-0 z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </section>
    </div>
  );
}

export default ItemInfo;
