'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemManagerActions, fetchCategories } from "@redux/itemStore";

const AddLandSize = () => {
  const { loading, categories } = useSelector(state => state.itemManager);
  const dispatch = useDispatch();
  const [size, setSize] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

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
  }

  return (
    <section className="text-white flex gap-5 justify-center">
      {loading ? <span className="loading loading-dots loading-lg text-themeFont" />
      :<>
      <input
        className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-sm'
        value={size}
        onChange={(e) => setSize(e.target.value)}
        type="text"
        placeholder="Add Land Size"
      />
      <button onClick={handleAddLandSize} className='text-themeFont font-semibold bg-bg-light py-2 px-6 rounded-sm'>ADD</button>
      </>}
      </section>
  );
}

export default AddLandSize;
