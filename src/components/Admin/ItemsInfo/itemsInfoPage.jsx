'use client'
import ItemInfo from '@components/Admin/ItemsInfo/itemsInfo';
import AddItemPage from '@components/Admin/ItemsInfo/addItemPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsHeadings } from '@redux/itemStore';
import { SiBlockchaindotcom } from 'react-icons/si';

const ItemsInfoPage = () => {
  const { loading, headings } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])

  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto py-10">
      <AddItemPage />
      {loading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          {Object.keys(headings).map((el, j) => {
            return <section key={j}>
              <section className='mt-10 p-5 bg-heading border-b border-white text-xl font-heading text-heading-txt font-bold flex items-center justify-between relative'>
                <h1><SiBlockchaindotcom className='text-white text-3xl' /></h1>
                <h1 className='absolute left-1/2 -translate-x-1/2 text-xl' > {el}</h1>
                <p>{headings[el]['order'] || 0}</p>
              </section>
              {Object.keys(headings[el]).map((ite, i) => {
                return ite != 'order' && <ItemInfo head={el} key={i} recomended = {headings[el][ite]['recomended']}>{ite}</ItemInfo>
              })}
            </section>
          })}
        </>}
    </section>
  )
}

export default ItemsInfoPage;
