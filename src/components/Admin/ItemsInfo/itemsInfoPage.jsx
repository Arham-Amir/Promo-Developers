'use client'
import ItemInfo from '@components/Admin/ItemsInfo/itemsInfo';
import AddItemPage from '@components/Admin/ItemsInfo/addItemPage';
import AddCategoriesPage from '@components/Admin/ItemsInfo/addCategoriesPage'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsHeadings, ItemManagerActions } from '@redux/itemStore';
import { SiBlockchaindotcom } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { BiSolidSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ItemsInfoPage = () => {
  const { headingloading, headings } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])

  return (
    <section className="w-11/12 md:w-4/5 mx-auto flex flex-col items-center justify-center gap-10 py-10">
      <AddCategoriesPage />
      {headingloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <AddItemPage />
          <section className='flex flex-col justify-center items-center gap-5 w-full'>
            {headings && Object.keys(headings).map((el, j) => {
              return <ShowItems el={el} key={j} headings={headings} />
            })}
          </section>
        </>}
    </section>
  )
}

export default ItemsInfoPage;

function ShowItems({ el, headings }) {
  const [editorder, seteditorder] = useState(false)
  const [order, setorder] = useState(headings[el]['order'] || 0)
  const dispatch = useDispatch()

  function handleOrderSaveBtn(el) {
    dispatch(ItemManagerActions.editOrder({
      'head': el,
      order
    }))
    dispatch(fetchItemsHeadings())
    seteditorder(!editorder)
  }
  function handleDeleteButton(e) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      e.stopPropagation();
      if (headings[el] == "null") {
        dispatch(ItemManagerActions.deleteItemHeading({ 'head': el }));
        dispatch(fetchItemsHeadings());
      }
      else {
        console.log(el)
        for (const item in headings[el]) {
          console.log(item)
          dispatch(ItemManagerActions.deleteItem({ 'head': el, 'item': item }));
        }
        dispatch(fetchItemsHeadings());
      }
    }
  }
  return <section className='flex flex-col w-full'>
    <section className='p-5 bg-heading border-b border-white text-xl font-heading text-heading-txt flex items-center justify-between'>
      <h3><SiBlockchaindotcom className='text-white text-3xl' /></h3>
      <section className='flex items-center'>
        <h3> {el}</h3>
        <button className='z-20' onClick={handleDeleteButton}><RiDeleteBin5Line /></button>
      </section>
      {editorder == false ?
        <section className="flex items-center gap-1 w-fit">
          <p>{headings[el]['order'] || 0}</p>
          <button onClick={(e) => seteditorder(prev => !prev)} ><FiEdit size={20}></FiEdit></button>
        </section>
        :
        <section className="flex items-center max-w-fit">
          <input className='focus:outline-none w-[20%] bg-slate-600 py-2 px-6 rounded-full'
            value={order}
            onChange={(e) => setorder(e.target.value)}
            type="text" />
          <button onClick={() => handleOrderSaveBtn(el)} ><BiSolidSave size={20}></BiSolidSave></button>
          <button onClick={(e) => seteditorder(prev => !prev)} ><GiCancel size={20}></GiCancel></button>
        </section>
      }
    </section>

    {headings[el] == "null" ? <p className='p-5'>No Items to show..</p>
      : Object.keys(headings[el]).map((ite, i) => {
        return ite != 'order' && <ItemInfo head={el} key={i} recomended={headings[el][ite]['recomended']}>{ite}</ItemInfo>
      })}
  </section>
}
