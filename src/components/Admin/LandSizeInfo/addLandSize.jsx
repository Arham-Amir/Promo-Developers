'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchAreas, fetchItemsHeadings, checkLandAvailaibility, fetchLandInfo } from "@redux/itemStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { toast } from 'react-toastify';
import ShowLandInfo from "./showLandInfo";

const AddLandSize = () => {
  const { areas, headings, arealoading, loading, loading_land, landInfo } = useSelector(state => state.itemManager);
  const dispatch = useDispatch();
  const [areaName, setAreaName] = useState('Areas')
  const [size, setSize] = useState('');
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    dispatch(fetchItemsHeadings())
  }, [])
  useEffect(() => {
    dispatch(fetchLandInfo())
  }, [])
  useEffect(() => {
  }, [loading_land])

  function handleAddArea() {
    if (areaName == "Areas") {
      toast('Please Select Area First')
      return;
    }
    if (size == "") {
      toast('Please Add Land Size First')
      return;
    }
    const obj = {};
    Object.keys(headings).forEach(cat => {
      Object.keys(headings[cat]).map((el) => {
        obj[el] = 0;
      });
    });
    dispatch(ItemManagerActions.addLandSize({ areaName, size, value: obj }));
    dispatch(fetchAreas());
    dispatch(checkLandAvailaibility(size))
      .then(() => {
        dispatch(fetchLandInfo());
      })
    setSize('');
    router.push('/admin/landSize')
  }

  return (
    <section className="flex-all-center flex-col md:w-4/5 xs:w-11/12 mx-auto gap-10">
      <section className="text-themeFont mt-10 flex gap-5 justify-center w-full">
        {arealoading || loading ? <span className="loading loading-dots loading-lg text-themeFont" />
          : <>
            {areas ? <>
              <input className='focus:outline-none w-[40%] bg-bg-1 py-2 px-6 rounded-sm'
                value={size}
                onChange={(e) => setSize(e.target.value)}
                type="text"
                placeholder="Add Land Size" />
              <div className="w-max collapse collapse-arrow bg-bg-1 text-themeFont rounded-none">
                <input onChange={() => { }} type="radio" name="my-accordion-100" checked={show} onClick={() => setShow(!show)} />
                <div className="collapse-title text-xl font-medium border-b border-bg-dark">
                  {areaName}
                </div>
                <div className="collapse-content flex flex-col items-start">
                  {Object.keys(areas)?.map((el, i) => {
                    return <button onClick={() => { setAreaName(el); setShow(false) }} key={i} className="w-fit hover:scale-105">{el}</button>
                  })}
                </div>
              </div>
              <button onClick={handleAddArea} className='bg-themeFont text-white py-2 px-6 rounded-sm'>ADD</button>
            </>
              : <p className="text-themeFont">First Add Area. <Link className="text-blue-600 underline" href="/admin/areas">Click here</Link> to add Area.</p>}

          </>}
      </section>

      {loading_land ? <span className="loading loading-dots loading-lg text-themeFont" />
        :
        <section className="flex-all-center flex-col gap-4 w-full">
          {landInfo && Object.keys(landInfo)?.map((el, i) => (
            <ShowLandInfo land={el} key={i} index={i} />
          ))}
        </section>
      }
    </section>
  );
}

export default AddLandSize;
