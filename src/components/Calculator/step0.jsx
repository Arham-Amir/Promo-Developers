'use client'

import { fetchAreas } from "@redux/itemStore";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const Step0 = (props = {}) => {
  const { arealoading, areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  return (
    <section className="mt-10 text-lightFont">
      {arealoading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <section className="w-11/12 mx-auto grid grid-cols-2 gap-5">
            {Object.keys(areas).map((are, i) => {
              return <section key={i} className="border-2 border-themeFont rounded-lg p-4 bg-bg-light h-48
                flex justify-end items-end text-2xl font-bold font-themeFont">
                <Link href={"/calculator/" + are}>{are}</Link>
              </section>
            })}
          </section>
        </>}
    </section>
  );
}

export default Step0;
