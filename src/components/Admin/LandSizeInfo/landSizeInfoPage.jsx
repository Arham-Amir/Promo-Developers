'use client'
import LandSizes from "@components/Admin/LandSizeInfo/landSizes";
import { fetchLandSize, fetchAreas, fetchCategories } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLandSize from "@components/Admin/LandSizeInfo/addLandSize";

const LandSizeInfoPage = () => {
  const { loading, arealoading, land, catloading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])
  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto  py-10">
      {loading || arealoading || catloading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          <AddLandSize />
          {Object.keys(land)?.map((el, i) => (
            <LandSizes key={i} id={i} item={land[el]} fetchLandFunc={() => fetchLandFunc()}>{el}</LandSizes>
          ))}
        </>}
    </section>
  );
}

export default LandSizeInfoPage;
