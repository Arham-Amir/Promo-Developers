'use client'
import ItemInfo from '@components/Admin/ItemsInfo/itemsInfo';
import AddItemPage from '@components/Admin/ItemsInfo/addItemPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '@redux/itemStore';
import { fetchCategories } from '@redux/itemStore'

const ItemsInfoPage = () => {
  const { loading, items, catloading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])



  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto py-10">
      <AddItemPage />
      {loading || catloading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          {Object.keys(items).map((el) => {
            return Object.keys(items[el]).map((ite, i) => {
              return <ItemInfo head={el} key={i}>{ite}</ItemInfo>
            })
          })}
        </>}
    </section>
  )
}

export default ItemsInfoPage;
