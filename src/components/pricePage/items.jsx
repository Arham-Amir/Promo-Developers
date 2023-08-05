'use client'
import Item from '@components/pricePage/item';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '@redux/itemStore';

const Items = () => {
  const {loading, items} = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])
  return (
    <>
      {Object.keys(items).map((el, i) => (
        <Item key={i}>{el}</Item>
      ))}

    </>
  )
}

export default Items;
