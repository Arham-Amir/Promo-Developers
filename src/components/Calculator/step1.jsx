'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLandSize } from "@redux/itemStore";
import Link from "next/link";

const Step1 = (props = {}) => {
  const { land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLandSize(props.area))
  }, [])

  useEffect(() => {
    dispatch(fetchLandSize(props.area))
  }, [props.area])

  return (
    <section className={`${props.className} py-5 pr-5 flex flex-col justify-center items-center bg-bg`}>
      <h1 className="text-themeFont z-30 text-3xl font-bold px-5 font-heading">{props.area}</h1>
      <section className="p-10 w-full text-themeFont grid grid-cols-3 gap-5">
        {land != "null" && Object.keys(land)?.map((el, i) => (
          <Link key={i} href={'/calculator/' + props.area + '/' + el}
            className="border border-bg-light p-3 rounded-lg text-lg font-semibold shadow-md shadow-black">
            {el}
          </Link>
        ))}
      </section>
    </section>
  );
}

export default Step1;
