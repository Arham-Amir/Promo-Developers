'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchCategories } from "@redux/itemStore";
import { useRouter } from "next/navigation";

const AddLandSize = () => {
  const { loading, categories } = useSelector(state => state.itemManager);
  const dispatch = useDispatch();
  const [size, setSize] = useState('');
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function handleAddLandSize() {
    if (Object.keys(categories).length === 0) {
      return;
    }

    const obj = {};
    Object.keys(categories).map((el) => {
      obj[el] = 0;
    });

    dispatch(ItemManagerActions.addLandSize({ size, value: obj }));
    setSize('');
    router.push('/addLandSize');
  }

  return (
    <section className="text-white flex gap-5">
      <input
        className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-full'
        value={size}
        onChange={(e) => setSize(e.target.value)}
        type="text"
      />
      <button onClick={handleAddLandSize} className='bg-indigo-800 py-2 px-6 rounded-full'>ADD</button>
    </section>
  );
}

export default AddLandSize;
