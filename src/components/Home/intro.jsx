'use client'

import { fetchAreas } from "@redux/itemStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


const Intro = () => {
  const { arealoading, areas } = useSelector(state => state.itemManager)
  const [arr, setArr] = useState([])
  const dispatch = useDispatch()
  const crouselRef = useRef()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
  }, [arr])
  // useEffect(() => {
  //   let arr = []
  //   Object.keys(areas).map((area) => {
  //     areas[area] != "null" && arr.push(...Object.keys(areas[area]))
  //   })
  //   setArr([...new Set(arr)])
  // }, [areas])

  function handelRightClick() {
    if (crouselRef.current) {
      const element = crouselRef.current;
      const cardWidth = element.scrollWidth / arr.length; // Calculate the width of one card
      element.scrollLeft += cardWidth + 10;
    }
  }

  function handelLeftClick() {
    if (crouselRef.current) {
      const element = crouselRef.current;
      const cardWidth = element.scrollWidth / arr.length; // Calculate the width of one card
      element.scrollLeft -= cardWidth + 10;
    }
  }



  return (
    <section className="my-8 py-8 bg-bg w-screen flex items-center justify-center">
      <section className="p-5 w-[96%] text-bg-dark flex flex-col gap-10">
        <section className="flex gap-5 items-center">
          <h1 className="text-3xl font-bold pl-1 font-heading">Browse Properties</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <section className="relative">
          {arealoading ? <span className="loading loading-dots loading-lg text-themeFont" /> :
            <section ref={crouselRef} className="scroll-smooth flex flex-wrap gap-1 justify-between h-full overflow-hidden">
              {/* <button onClick={handelRightClick} className="absolute top-1/2 -translate-y-1/2 right-0 "><FontAwesomeIcon icon={faChevronRight}
              className='text-white bg-themeFont w-3 h-4 p-2 text-sm' /></button>
            <button onClick={handelLeftClick} className="absolute top-1/2 -translate-y-1/2 left-0 "><FontAwesomeIcon icon={faChevronLeft}
              className='text-white bg-themeFont w-3 h-4 p-2 text-sm' /></button> */}
              {/* {arr.map((ls, i) => {
                return <Card key={i} land={ls} />
              })} */}
              <Card link="/calculator/Al-Kabir Town ( Phase 2 )/3 Marla" land="3 Marla"></Card>
              <Card link="/calculator/DHA Rahbar ( Phase XI )/5 Marla" land="5 Marla"></Card>
              <Card link="/calculator/Jubilee Town /10 Marla" land="10 Marla"></Card>
              <Card link="/calculator/Fazaia Housing Scheme/1 Kanal" land="1 Kanal"></Card>
            </section>
          }
        </section>
      </section>
    </section>
  );
}

export default Intro;

const Card = ({land, link}) => {
  return (<>
    <section className="basis-1/5 m-3 glow-section font-themeFont border border-gray-400 shadow-sm shadow-black p-5 rounded-2xl flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl font-bold">{land}</h1>
      <hr />
      <section className="flex flex-col gap-3">
        {/* <p className="border text-lg p-3">Al Kabir Town</p>
        <p className="border text-lg p-3">Bahria</p> */}
        <Link href={link} className="border p-3 text-lg hover:bg-gray-300 font-bold text-themeFont rounded-md">View Construction Cost</Link>
      </section>
    </section>
  </>
  );
}


