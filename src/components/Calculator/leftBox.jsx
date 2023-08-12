'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandSize } from "@redux/itemStore";
import ShowLand from "@components/Calculator/showLand";

const LeftBox = (props = {}) => {
  const { loading, land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])

  return (
    <section className={`${props.class} flex flex-col`}>
      <section className="m-2 bg-slate-300 flex-grow rounded-2xl">
        <section className="bg-indigo-900 py-6 px-4 rounded-t-2xl text-center">
          Select Land Size
        </section>
        <section className="text-slate-600 p-4">
          <ShowLand land = {land}/>
        </section>
      </section>
    </section>
  );
}

export default LeftBox;
