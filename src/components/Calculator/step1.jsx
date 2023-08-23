// .ul {
//   @apply relative flex flex-col gap-7;
// }

// .ul .li {
//   @apply relative list-none;
// }

// .ul .li .a {
//   @apply relative text-5xl uppercase text-transparent;
//   -webkit-text-stroke: 1px white;
// }

// .ul .li .a::before {
//   content: attr(data-text);
//   position: absolute;
//   color: var(--clr);
//   width: 0;
//   overflow: hidden;
//   transition: 0.5s;
//   border-right: 8px solid var(--clr);
//   -webkit-text-stroke: 1px var(--clr);
// }

// .ul .li .a:hover::before {
//   width: 100%;
//   filter: drop-shadow(0 0 50px var(--clr));
// }
'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLandSize } from "@redux/itemStore";

const Step1 = () => {
  const { land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])
  return (
    <section className="backdrop-blur-[2px] p-5 mt-4">
      <ul className="ul">
        {Object.keys(land)?.map((el, i) => (
          <Li key={i} link={'/calculator/' + el.split(" ").join("")} data={el} color={`rgb(14 30 233)`} />
        ))}
      </ul>
    </section>
  );
}

const Li = ({ data, color, link }) => {
  return (
    <li style={{ '--clr': color }} className="li">
      <a style={{ whiteSpace: 'nowrap' }} className="a" data-text={`${"\u00A0"}${data}${"\u00A0"}`} href={link}>
        {"\u00A0"}{data}{"\u00A0"}
      </a>
    </li>
  )
}


export default Step1;
