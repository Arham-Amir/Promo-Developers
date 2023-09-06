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
    <section className="text-lightFont flex flex-col gap-10 custom-scrollbar box-border py-10">
      {arealoading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <SearchArea areas={areas} setQueryData = {(q)=> props.setQueryData(q)} />
        </>}
      <style jsx>
        {`
          .custom-scrollbar {
            overflow-y: scroll;
            height: 88vh
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #4A4C5C;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #D4A056;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #bdc3c7;
          }
        `}
      </style>
    </section>
  );
}

export default Step0;
