'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLandSize } from "@redux/itemStore";
import Link from "next/link";

const Step1 = (props = {}) => {
  const { land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])
  return (
    <section className={`${props.className} py-5 pr-5 flex justify-start items-center`}>
      <ul className="ul bg-bg-dark py-10 pl-16 pr-36 shadow-2xl absolute -left-10">
        {Object.keys(land)?.map((el, i) => (
          <Li key={i} link={'/calculator/' + el.split(" ").join("")} data={el} color={`#D4A056`} />
        ))}
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


export default Step1;
