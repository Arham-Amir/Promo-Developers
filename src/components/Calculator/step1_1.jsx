'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAreas } from "@redux/itemStore";
import Link from "next/link";

const Step1_1 = (props = {}) => {
  const { areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])

  useEffect(() => {
    dispatch(fetchAreas())
  }, [props.land])

  return (
    <section className={`${props.className} py-5 pr-5 flex flex-col justify-center items-center bg-bg`}>
      <h1 className="text-themeFont z-30 text-3xl font-bold px-5 font-heading">{props.land}</h1>
      <section className="p-10 w-full text-themeFont grid grid-cols-3 gap-5">
        {areas !== "null" && Object.keys(areas)?.map((el) => {
          return Object.keys(areas[el]).map((la, j) => {
            if (props.land === la) {
              return (
                <Link key={j} href={'/calculator/' + el + '/' + props.land}
                  className="border border-bg-light p-3 rounded-lg text-lg font-semibold shadow-md shadow-black">
                  {el}
                </Link>);
            }
            return null;
          });
        })}
      </section>
    </section>
  );
}

export default Step1_1;
