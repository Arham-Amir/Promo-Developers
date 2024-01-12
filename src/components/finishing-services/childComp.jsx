'use client'
import { fetchFinishingItems } from '@redux/itemStore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChildComp = () => {
  const { finishingItems, finishingItemsLoading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFinishingItems())
  }, []);

  return (
    <section className=''>
      {finishingItemsLoading ?
        <span className="loading loading-dots loading-lg text-black" />
        :
        <section className='flex-all-center flex-row gap-8 '>
          {finishingItems && Object.keys(finishingItems).map((el, i) => {
            return <Card key={i} finishingItems={finishingItems} category={el} />
          })}
        </section>
      }
    </section>
  );
}

export default ChildComp;

function Card({ category, finishingItems }) {

  return <h1>{category}</h1>
}
