'use client'
import { Suspense, useEffect, useState } from 'react';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@redux/itemStore';

const CenterBox = (props = {}) => {
  const [choice, setChoice] = useState('');
  const { loading, items } = useSelector(state => state.itemManager)

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <article className={`${props.class} flex flex-col`}>
      <section className="flex-grow m-2 ">
        <section className="bg-bg-light w-fit mx-auto rounded-2xl text-themeFont p-4 flex-all-center gap-7">
          <section className='flex gap-2 items-center'>
            <input type="radio" value={"Recomended"} checked={choice === "Recomended"} onChange={handleOptionChange} name="radio-0" id='r1' className="radio radio-warning" />
            <label htmlFor="r1">Recomended</label>
          </section>
          <section className='flex gap-2 items-center'>
            <input type="radio" value={"Custom"} checked={choice === "Custom"} onChange={handleOptionChange} name="radio-0" id='r2' className="radio radio-warning" />
            <label htmlFor="r2">Build Your Own House</label>
          </section>
        </section>
        <section className="text-themeFont p-4">
          {Object.keys(items).map((el, i) => (
            <Suspense key={i} fallback={<span className="loading loading-dots loading-lg"></span>}>
              <CenterBoxItems index={i} item={el} detail={items[el]} choice={choice}
                setChoice={setChoice}></CenterBoxItems>
            </Suspense>

          ))}
        </section>
      </section>
    </article>
  );
};

export default CenterBox;
