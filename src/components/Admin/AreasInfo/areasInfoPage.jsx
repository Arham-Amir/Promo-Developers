'use client'
import Areas from "@components/Admin/AreasInfo/areas";
import { fetchAreas } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAreasInfo from "@components/Admin/AreasInfo/addAreasInfo";

const AreasInfoPage = () => {
  const { loading, areas } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
  }, [areas])

  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto  py-10">
      {loading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          <AddAreasInfo />
          {Object.keys(areas)?.map((are, i) => {
            return <section key={i} className="flex flex-col my-10 items-center bg-bg-light">
              <h1 className='py-3 border-b-2 border-bg-dark text-3xl text-center text-themeFont font-bold'>{are}</h1>
              {areas[are] == 'null' ? <p className="py-5 text-themeFont">No Land Size</p> :
               Object.keys(areas[are])?.map((land, j) => {
                return <Areas key={(i + 1) * (j + 1)} id={(i + 1) * (j + 1)} item={areas[are][land]} area = {are}>{land}</Areas>
              })}
            </section>
          })}
        </>}
    </section>
  );
}

export default AreasInfoPage;
