'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCommonLandSize, fetchAreas, fetchItemsHeadings, fetchLandInfo } from "@redux/itemStore";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from 'react-toastify';
import ShowLandInfo from "./showLandInfo";

const AddLandInfo = () => {
  const { areas, arealoading, landloading, landInfo } = useSelector(state => state.itemManager);
  const dispatch = useDispatch();
  const [landName, setlandName] = useState('Areas')
  const [customLoading, setcustomLoading] = useState(true)
  const [lands, setLands] = useState([]);


  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    dispatch(fetchLandInfo())
  }, [])
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])
  useEffect(() => {
    if (!arealoading) {
      const landArray = [];
      Object.keys(areas)?.forEach((ar) => {
        Object.keys(areas[ar]).forEach((la) => {
          landArray.push(la);
        });
      });
      setLands([...new Set(landArray)]);
      setcustomLoading(false)
    }
  }, [arealoading])

  function handleAddArea() {
    if (landName == "Areas") {
      toast('Please Select Area First')
      return;
    }
    dispatch(addCommonLandSize({ 'land': landName })).then(() => {
      dispatch(fetchLandInfo());
    })
  }

  return (
    <section className="flex-all-center flex-col w-11/12 md:w-4/5 mx-auto gap-10">
      <section className="text-themeFont mt-10 flex gap-5 justify-center w-full">
        {arealoading || customLoading ? <span className="loading loading-dots loading-lg text-themeFont" />
          : <>
            {areas ? <>
              <section className="min-h-full">
                <select className="h-full bg-bg-1 rounded-sm p-2" name="areas" id="areas" value={landName} onChange={(e) => setlandName(e.target.value)}>
                  <option value="Areas">Select</option>
                  {lands.map((la, i) => (
                    <option key={i} value={la}>{la}</option>
                  ))
                  }
                </select>
              </section>
              <button onClick={handleAddArea} className='bg-themeFont text-white'>ADD</button>
            </>
              : <p className="text-themeFont">First Add Area. <Link className="text-blue-600 underline" href="/admin/areas">Click here</Link> to add Area.</p>}

          </>}
      </section>

      {landloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        :
        <section className="flex-all-center flex-col gap-4 w-full">
          {landInfo != {} && Object.keys(landInfo)?.map((el, i) => (
            <ShowLandInfo land={el} key={i} index={i} />
          ))}
        </section>
      }
    </section>
  );
}

export default AddLandInfo;
