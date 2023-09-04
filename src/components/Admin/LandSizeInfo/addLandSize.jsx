'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchAreas, fetchCategories } from "@redux/itemStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddLandSize = () => {
  const { areas, categories, arealoading, catloading } = useSelector(state => state.itemManager);
  const dispatch = useDispatch();
  const [areaName, setAreaName] = useState('Areas')
  const [size, setSize] = useState('');
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  function handleAddArea() {
    if (Object.keys(categories).length === 0) {
      return;
    }
    const obj = {};
    Object.keys(categories).forEach(cat => {
      Object.keys(categories[cat]).map((el) => {
        obj[el] = 0;
      });
    });
    dispatch(ItemManagerActions.addLandSize({ areaName, size, value: obj }));
    setSize('');
    router.push('/admin/landSize')
  }

  return (
    <section className="text-white mt-10 flex gap-5 justify-center">
      {arealoading || catloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        : <>
          <input className='focus:outline-none w-[40%] bg-bg-light py-2 px-6 rounded-sm'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            type="text"
            placeholder="Add Land Size" />
          <div className="w-max collapse collapse-arrow bg-bg-light text-themeFont rounded-none">
            <input onChange={() => { }} type="radio" name="my-accordion-100" checked={show} onClick={() => setShow(!show)} />
            <div className="collapse-title text-xl font-medium border-b border-bg-dark">
              {areaName}
            </div>
            <div className="collapse-content flex flex-col items-start">
              {Object.keys(areas).map((el, i) => {
                return <button onClick={() => { setAreaName(el); setShow(false) }} key={i} className="w-fit hover:scale-105">{el}</button>
              })}
            </div>
          </div>
          <button onClick={handleAddArea} className='bg-bg-light text-themeFont py-2 px-6 rounded-sm'>ADD</button>
        </>}
    </section>
  );
}

export default AddLandSize;
