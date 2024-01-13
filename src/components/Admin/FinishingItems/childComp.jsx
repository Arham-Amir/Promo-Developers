'use client'
import ItemInfo from '@components/Admin/FinishingItems/itemsInfo';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFinishingItems, ItemManagerActions, renameFinishingCategory } from '@redux/itemStore';
import { SiBlockchaindotcom } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { BiSolidSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import AddItemPage from './addItemPage/addItemPage';
import AddCategoriesPage from './addCategoriesPage/addCategoriesPage';
import { RiDeleteBin5Line } from 'react-icons/ri';

const ChildComp = () => {
  const { finishingItemsloading, finishingItems } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFinishingItems())
  }, [])

  return (
    <section className="w-11/12 md:w-4/5 mx-auto flex-all-center flex-col gap-10 py-10">
      <AddCategoriesPage />
      {finishingItemsloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <AddItemPage />
          <section className='flex flex-col justify-center items-center gap-5 w-full'>
            {finishingItems && Object.keys(finishingItems).map((el, j) => {
              return <ShowCategories el={el} key={j} id={j} finishingItems={finishingItems} />
            })}
          </section>
        </>}
    </section>
  )
}

export default ChildComp;

function ShowCategories({ el, finishingItems, id }) {
  const [show, setShow] = useState(false)
  const [editorder, seteditorder] = useState(false)
  const [order, setorder] = useState(finishingItems[el]['order'] || 0)
  const dispatch = useDispatch()

  function handleShowBtn() {
    setShow(!show)
  }
  function handleOrderSaveBtn() {
    dispatch(ItemManagerActions.editFinishingPakcageOrder({
      'head': el,
      order
    }))
    dispatch(fetchFinishingItems())
    seteditorder(!editorder)
  }

  return (
    <section className='flex flex-col gap-5 w-full'>
      <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none text-themeFont ${show ? 'collapse-open' : ''}`}>
        <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${id}`} checked={show} onClick={handleShowBtn} />
        <div className="max-w-full collapse-title text-2xl font-bold bg-heading text-heading-txt flex justify-between items-center" onClick={handleShowBtn}>
          <h3><SiBlockchaindotcom className='text-white text-3xl' /></h3>
          <section className='flex items-center'>
            <h3> {el}</h3>
          </section>
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
              <button onClick={(e) => { e.stopPropagation(); handleOrderSaveBtn() }} ><BiSolidSave size={20}></BiSolidSave></button>
              <button onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
            </section>
          }
        </div>

        {show && Object.keys(finishingItems[el]).map((ite, i) => {
          return ite != 'order' && <ShowItems key={i} id={i} finishingItems={finishingItems} pack={el} category={ite} ></ShowItems>
        })}
      </div>

    </section>
  )
}

function ShowItems({ finishingItems, category, pack, id }) {
  const [show, setShow] = useState(false)
  const [editorder, seteditorder] = useState(false)
  const [order, setorder] = useState(finishingItems[pack][category]['order'] || 0)
  const [editname, seteditname] = useState(false)
  const [name, setname] = useState(category)
  const dispatch = useDispatch()

  function handleShowBtn() {
    setShow(!show)
  }
  function handleOrderSaveBtn() {
    dispatch(ItemManagerActions.editFinishingCategoryOrder({
      'category': category,
      order
    }))
    dispatch(fetchFinishingItems())
    seteditorder(!editorder)
  }
  function handleNameSaveBtn() {
    dispatch(renameFinishingCategory({
      'package': pack,
      'category': category,
      name
    })).then(() => {
      dispatch(fetchFinishingItems())
    })
    seteditname(!editname)
  }
  function handledeletebutton(e) {
    const confirmed = window.confirm("Are you sure you want to delete from all categories?");
    if (confirmed) {
      e.stopPropagation();
      dispatch(ItemManagerActions.deleteFinishingCategory({
        'category': category,
      }));
      dispatch(fetchFinishingItems());
    }
  }

  return (
    <section className='flex flex-col gap-5 w-full'>
      <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
        <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${id}`} checked={show} onClick={handleShowBtn} />
        <div className="max-w-full collapse-title text-2xl font-bold bg-bg-1 text-themeFont flex justify-between items-center" onClick={handleShowBtn}>
          <section className='flex items-center'>
            {editname == false ?
              <section className='flex items-center z-20'>
                <p>{category}</p>
                <button className='' onClick={(e) => { e.stopPropagation(); seteditname(prev => !prev) }} ><FiEdit size={20}></FiEdit></button>
              </section>
              :
              <section className="flex items-center max-w-fit z-20">
                <input className='text-sm focus:outline-none w-[40%] bg-bg py-2 px-6 rounded-full'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text" />
                <button onClick={(e) => { e.stopPropagation(); handleNameSaveBtn() }} ><BiSolidSave size={20}></BiSolidSave></button>
                <button onClick={(e) => { e.stopPropagation(); seteditname(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
              </section>
            }
          </section>
          <section className='flex z-20 gap-5'>
            {editorder == false ?
              <section className="flex items-center gap-1 w-fit z-20">
                <p>{finishingItems[pack][category]['order'] || 0}</p>
                <button onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><FiEdit size={20}></FiEdit></button>
              </section>
              :
              <section className="flex items-center max-w-fit z-20 text-sm">
                <input className='focus:outline-none w-[20%] bg-bg py-2 px-6 rounded-full'
                  value={order}
                  onChange={(e) => setorder(e.target.value)}
                  type="text" />
                <button onClick={(e) => { e.stopPropagation(); handleOrderSaveBtn() }} ><BiSolidSave size={20}></BiSolidSave></button>
                <button onClick={(e) => { e.stopPropagation(); seteditorder(prev => !prev) }} ><GiCancel size={20}></GiCancel></button>
              </section>
            }
            <button className='p-0 z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
          </section>
        </div>

        {show && (finishingItems[pack][category] == "null" ? <p className='p-4'>Nothing to show</p> : Object.keys(finishingItems[pack][category]).map((ite, i) => {
          return ite != 'order' && <ItemInfo finishingItems={finishingItems} pack={pack} category={category} key={i} item={ite}></ItemInfo>
        }))}
      </div>

    </section>
  )
}
