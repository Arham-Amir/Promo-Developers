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
    <section className={`${props.className} shadow-2xl backdrop-blur-[1px]
     py-5 pr-5 gap-10 flex flex-col justify-center items-start custom-scrollbar h-[53vh]`}>
      <h1 className="text-lightFont z-30 text-2xl px-5">{props.land} Selected</h1>
      <ul className="ul pl-16 pr-36">
        {areas !== "null" && Object.keys(areas)?.map((el) => {
          return Object.keys(areas[el]).map((la, j) => {
            if (props.land === la) {
              return (
                <Li key={j} link={'/calculator/' + el + '/' + props.land} data={el} color={`#D4A056`} />
              );
            }
            return null;
          });
        })}
      </ul>
    </section>
  );
}

const Li = ({ data, color, link }) => {
  return (
    <li style={{ '--clr': color }} className="li">
      <Link style={{ whiteSpace: 'nowrap' }} className="a" data-text={`${"\u00A0"}${data}${"\u00A0"}`} href={link}>
        {"\u00A0"}{data}{"\u00A0"}
      </Link>
    </li>
  )
}


export default Step1_1;
