'use client'
import LandSizes from "@components/Admin/LandSizeInfo/landSizes";
import { fetchLandSize } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLandSize from "@components/Admin/LandSizeInfo/addLandSize";

const LandSizeInfoPage = () => {
  const { loading, land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])

  return (
    <section className="md:w-4/5 xs:w-11/12 mx-auto  py-10">
      <AddLandSize />
      {loading ? <span className="flex justify-center items-center min-h-screen min-w-full loading loading-dots loading-lg text-themeFont" />
        : <>
          {Object.keys(land)?.map((el, i) => (
            <LandSizes key={i} id={i} item={land[el]} fetchLandFunc={() => fetchLandFunc()}>{el}</LandSizes>
          ))}
        </>}
    </section>
  );
}

export default LandSizeInfoPage;
