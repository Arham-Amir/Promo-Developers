'use client'
import { fetchFinishingItems } from '@redux/itemStore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";

const ChildComp = () => {
  const { finishingItems, finishingItemsLoading } = useSelector(state => state.itemManager)
  const [sortedCategories, setsortedCategories] = useState([]);
  const [sortedItems, setsortedItems] = useState([]);

  const [cLoading, setcloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (finishingItems != {}) {
      dispatch(fetchFinishingItems())
    }
  }, []);

  useEffect(() => {
    if (Object.keys(finishingItems).length != 0) {
      const sortedCategories = Object.keys(finishingItems).sort((a, b) => finishingItems[a].order - finishingItems[b].order);
      setsortedCategories(sortedCategories)

      const obj = finishingItems["Standard"]
      console.log(finishingItems)
      const keys = Object.keys(obj);
      keys.sort((a, b) => {
        const orderA = obj[a]?.order || Number.MAX_SAFE_INTEGER;
        const orderB = obj[b]?.order || Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      });
      setsortedItems(keys)

      setcloading(false)
    }
  }, [finishingItems]);


  return (
    <section className='flex-all-center flex-col gap-10 w-screen my-10'>
      <h1 className='text-themeFont font-themeFont'>Finishing Services Packages</h1>
      {finishingItemsLoading || cLoading ? <span className="loading loading-dots loading-lg text-black" />
        :
        <section className='w-full flex-all-center flex-row gap-x-8 gap-y-10 flex-wrap'>
          {finishingItems && sortedCategories.map((el, i) => {
            return <Card key={i} finishingItems={finishingItems} category={el} sortedItems={sortedItems} />
          })}
        </section>
      }
    </section>
  );
}

export default ChildComp;

function Card({ category, finishingItems, sortedItems }) {

  return <section className='basis-2/3 sm:basis-2/5 lg:basis-2/7 p-4 flex-all-center flex-col gap-5 border-bg-dark border rounded-md shadow-md glow-section shadow-themeFont hover:scale-110 transition-all duration-200'>
    <section className='flex-all-center'>
      <h2 className='font-heading'>{category}</h2>
    </section>
    <hr className='w-full border-themeFont' />
    <section className='flex flex-col gap-3 w-full p-2'>
      {sortedItems.map((el, i) => {
        return el != "order" && <section key={i} className='flex gap-3 items-center'>
          {finishingItems[category][el]["price"] ? <p><TiTick className='text-xl text-green-600 w-5' /></p> : <p><ImCross className='text-xs text-red-700 w-5' /></p>}
          <p className='font-bold' key={i}>{el}</p>
          {finishingItems[category][el]["price"] && <p>{finishingItems[category][el]["price"]}</p>}
        </section>
      })}
    </section>
  </section>
}
