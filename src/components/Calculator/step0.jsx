'use client'

import { fetchAreas } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchArea from '@components/Calculator/searchArea'


const Step0 = (props = {}) => {
  const { arealoading, areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])

  return (
    <section className="text-lightFont flex flex-col gap-10 h-full  box-border py-8">
      {arealoading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <SearchArea areas={areas} setArea = {(q)=> props.setArea(q)} setLand = {(q)=> props.setLand(q)} />
        </>}
    </section>
  );
}

export default Step0;
