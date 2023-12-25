'use client'
import ItemInfo from '@components/Admin/ItemsInfo/itemsInfo';
import AddItemPage from '@components/Admin/ItemsInfo/addItemPage';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsHeadings, ItemManagerActions } from '@redux/itemStore';
import { SiBlockchaindotcom } from 'react-icons/si';
import { FiEdit } from 'react-icons/fi';
import { BiSolidSave } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';

const ItemsInfoPage = () => {
  const { loading, headings } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])

  return (
    <section className="w-11/12 md:w-4/5 mx-auto py-10">
      <AddItemPage />
      {loading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          {Object.keys(headings).map((el, j) => {
            return <ShowItems el={el} key={j} headings={headings} />
          })}
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

  return <section >
    <section className='mt-10 p-5 bg-heading border-b border-white text-xl font-heading text-heading-txt flex items-center justify-between'>
      <h3><SiBlockchaindotcom className='text-white text-3xl' /></h3>
      <h3> {el}</h3>
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
    {Object.keys(headings[el]).map((ite, i) => {
      return ite != 'order' && <ItemInfo head={el} key={i} recomended={headings[el][ite]['recomended']}>{ite}</ItemInfo>
    })}
  </section>
}
