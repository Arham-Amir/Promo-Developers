'use client'
import HouseSizes from "@components/houseInfoPages/houseSizes";
import { fetchLandSize } from "@redux/itemStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const HouseInfo = () => {
  const { loading, land } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLandSize())
  }, [])
  return (
    <section>

      {Object.keys(land)?.map((el, i) => (
        <HouseSizes key={i} item = {land[el]}>{el}</HouseSizes>
      ))}
    </section>
  );
}

export default HouseInfo;
