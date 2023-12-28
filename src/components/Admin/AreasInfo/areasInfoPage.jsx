'use client'
import Areas from "@components/Admin/AreasInfo/areas";
import { fetchAreas, fetchItemsHeadings } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAreasInfo from "@components/Admin/AreasInfo/addAreasInfo";
import { SiBlockchaindotcom } from "react-icons/si";
import AddLandSize from "./addLandSize";

const AreasInfoPage = () => {
  const { arealoading, headingloading, areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])

  return (
    <section className="w-11/12 md:w-4/5 mx-auto py-10 flex flex-col items-center justify-center">
      <AddAreasInfo />
      {arealoading || headingloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <AddLandSize />
          {areas && Object.keys(areas)?.map((are, i) => {
            return <section key={i} className="w-full flex flex-col my-10 items-center bg-bg-1">
              <section className='w-full p-5 bg-heading border-b border-white text-xl font-heading text-heading-txt font-bold flex items-center justify-between relative'>
                <h1><SiBlockchaindotcom className='text-white text-3xl' /></h1>
                <h1 className='absolute left-1/2 -translate-x-1/2 text-xl' > {are}</h1>
              </section>
              {areas[are] == 'null' ? <p className="py-5 text-themeFont">No Land Size</p> :
                Object.keys(areas[are])?.map((land, j) => {
                  return <Areas key={(i + 1) * (j + 1)} id={(i + 1) * (j + 1)} item={areas[are][land]} area={are}>{land}</Areas>
                })}
            </section>
          })}
        </>}
    </section>
  );
}

export default AreasInfoPage;
