'use client'
import { fetchFinishingItems } from '@redux/itemStore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";

const ChildComp = () => {
  const { finishingItems, finishingItemsLoading } = useSelector(state => state.itemManager)
  const [sortedPackages, setsortedPackages] = useState([]);
  const [sortedCategories, setsortedCategories] = useState([]);
  const [sorteditems, setsorteditems] = useState({});

  const [cLoading, setcloading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (finishingItems != {}) {
      dispatch(fetchFinishingItems())
    }
  }, []);

  useEffect(() => {
    if (Object.keys(finishingItems).length != 0) {
      const sortedPackages = Object.keys(finishingItems).sort((a, b) => finishingItems[a].order - finishingItems[b].order);
      setsortedPackages(sortedPackages)

      const obj = finishingItems["Standard"]
      const keys = Object.keys(obj);
      keys.sort((a, b) => {
        const orderA = obj[a]?.order || Number.MAX_SAFE_INTEGER;
        const orderB = obj[b]?.order || Number.MAX_SAFE_INTEGER;

        return orderA - orderB;
      });
      setsortedCategories(keys)

      Object.keys(obj).forEach(key => {
        if (key != 'order') {
          const subKeys = Object.keys(obj[key]).sort((a, b) => {
            if (a != 'order' || b != 'order') {
              const orderA = obj[key][a]?.order || Number.POSITIVE_INFINITY;
              const orderB = obj[key][b]?.order || Number.POSITIVE_INFINITY;

              return orderA - orderB;
            }
          });
          setsorteditems(prevState => {
            return { ...prevState, [key]: subKeys };
          });
        }
      });
      setcloading(false)
    }
  }, [finishingItems]);


  return (
    <section className='flex-all-center flex-col gap-10 w-screen my-10'>
      <h1 className='text-themeFont font-themeFont'>Finishing Services Packages</h1>
      {finishingItemsLoading || cLoading ? <span className="loading loading-dots loading-lg text-black" />
        :
        <section className='w-full flex-all-center flex-row gap-x-8 gap-y-10 flex-wrap'>
          {finishingItems && sortedPackages.map((el, i) => {
            return <Card key={i} finishingItems={finishingItems} pack={el} sorteditems={sorteditems} sortedCategories={sortedCategories} />
          })}
        </section>
      }
    </section>
  );
}

export default ChildComp;

function Card({ pack, finishingItems, sortedCategories, sorteditems }) {

  return <section className='basis-2/3 bg-gradient-to-r from-bg to-bg-1 sm:basis-2/5 lg:basis-2/7 p-4 flex-all-center flex-col gap-5 border-bg-dark border rounded-md shadow-md glow-section shadow-themeFont hover:scale-110 transition-all duration-200 text-themeFont'>
    <section className='flex-all-center'>
      <h2 className='font-heading'>{pack}</h2>
    </section>
    <hr className='w-full border-themeFont' />
    <section className='flex flex-col gap-3 w-full p-2'>
      {sortedCategories.map((el, i) => {
        return el != "order" && <section key={i} className='flex flex-col gap-5'>
          <p className='font-bold border border-themeFont rounded-md p-2'>{el}</p>
          {sorteditems[el].map((it, j) => {
            return it != 'order' && <section key={j} className='flex gap-2 items-center justify-between pl-2'>
              <section className='flex gap-3 items-center'>
                {finishingItems[pack][el][it]["price"] ? <p><TiTick className='text-xl text-green-600 w-5' /></p> : <p><ImCross className='text-xs text-red-700 w-5' /></p>}
                <p className='font-bold' >{it}</p>
              </section>
              {finishingItems[pack][el][it]["price"] ? <p>{finishingItems[pack][el][it]["price"]}</p> : <p> </p>}
            </section>
          })}
        </section>
      })}
    </section>
  </section>
}
