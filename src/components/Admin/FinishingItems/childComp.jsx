'use client'
import ItemInfo from '@components/Admin/FinishingItems/itemsInfo';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFinishingItems, fetchItemsHeadings, ItemManagerActions, renameCategory } from '@redux/itemStore';
import { SiBlockchaindotcom } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { BiSolidSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import AddItemPage from './addItemPage/addItemPage';

const ChildComp = () => {
  const { finishingItemsloading, finishingItems } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFinishingItems())
  }, [])

  return (
    <section className="w-11/12 md:w-4/5 mx-auto flex-all-center flex-col gap-10 py-10">
      <AddItemPage />
      {finishingItemsloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <section className='flex flex-col justify-center items-center gap-5 w-full'>
            {finishingItems && Object.keys(finishingItems).map((el, j) => {
              return <ShowItems el={el} key={j} id={j} finishingItems={finishingItems} />
            })}
          </section>
        </>}
    </section>
  )
}

export default ChildComp;

function ShowItems({ el, finishingItems, id }) {
  const [show, setShow] = useState(false)
  const [editorder, seteditorder] = useState(false)
  const [order, setorder] = useState(finishingItems[el]['order'] || 0)
  const dispatch = useDispatch()
  // const [editname, seteditname] = useState(false)
  // const [name, setname] = useState(el)

  function handleShowBtn() {
    setShow(!show)
  }
  function handleOrderSaveBtn(el) {
    dispatch(ItemManagerActions.editFinishingCategoryOrder({
      'head': el,
      order
    }))
    dispatch(fetchFinishingItems())
    seteditorder(!editorder)
  }
  // function handleNameSaveBtn(el) {
  //   dispatch(renameCategory({
  //     'head': el,
  //     name
  //   })).then(() => dispatch(fetchFinishingItems()))
  //   seteditname(!editname)
  // }
  return (
    <section className='flex flex-col gap-5 w-full'>
      <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
        <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${id}`} checked={show} onClick={handleShowBtn} />
        <div className="max-w-full collapse-title text-2xl font-bold bg-heading text-heading-txt flex justify-between items-center" onClick={handleShowBtn}>
          <h3><SiBlockchaindotcom className='text-white text-3xl' /></h3>
          {/* {editname == false ? */}
          <section className='flex items-center'>
            <h3> {el}</h3>
            {/* <button onClick={(e) => seteditname(prev => !prev)} ><FiEdit size={20}></FiEdit></button> */}
          </section>
          {/* : */}
          {/* <section className="flex items-center max-w-fit">
              <input className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
                value={name}
                onChange={(e) => setname(e.target.value)}
                type="text" />
              <button onClick={() => handleNameSaveBtn(el)} ><BiSolidSave size={20}></BiSolidSave></button>
              <button onClick={(e) => seteditname(prev => !prev)} ><GiCancel size={20}></GiCancel></button>
            </section>
          } */}
          {editorder == false ?
            <section className="flex items-center gap-1 w-fit z-20">
              <p>{finishingItems[el]['order'] || 0}</p>
              <button onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><FiEdit size={20}></FiEdit></button>
            </section>
            :
            <section className="flex items-center max-w-fit z-20 text-sm">
              <input className='focus:outline-none w-[20%] bg-slate-600 py-2 px-6 rounded-full'
                value={order}
                onChange={(e) => setorder(e.target.value)}
                type="text" />
              <button onClick={(e) => { e.stopPropagation(); handleOrderSaveBtn(el) }} ><BiSolidSave size={20}></BiSolidSave></button>
              <button onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
            </section>
          }
        </div>

        {show && Object.keys(finishingItems[el]).map((ite, i) => {
          return ite != 'order' && <ItemInfo head={el} key={i} >{ite}</ItemInfo>
        })}
      </div>

    </section>
  )
}
