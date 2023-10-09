'use client'
import Areas from "@components/Admin/AreasInfo/areas";
import { fetchAreas } from "@redux/itemStore";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAreasInfo from "@components/Admin/AreasInfo/addAreasInfo";
import { SiBlockchaindotcom } from "react-icons/si";

const AreasInfoPage = () => {
  const { loading, areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
  }, [areas])

  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto py-10">
      {loading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          <Suspense>
            <AddAreasInfo />
          </Suspense>
          {areas && Object.keys(areas)?.map((are, i) => {
            return <section key={i} className="flex flex-col my-10 items-center bg-bg-1">
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
