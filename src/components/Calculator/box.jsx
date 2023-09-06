'use client'
import { Suspense, useEffect, useState } from 'react';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@redux/itemStore';
import { LeftBox } from '@components/Calculator/leftBox'
import { useImmer } from "use-immer";

const Box = (props = {}) => {
  const [choice, setChoice] = useState('Recomended');
  const [cost, setCost] = useImmer({});
  const { loading, items } = useSelector(state => state.itemManager)

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])
  useEffect(() => {
    Object.keys(items).forEach(el => {
      setCost((draft) => {
        draft[el] = 0
      })
    });
  }, [])

  return (
    <section className='flex flex-row'>
      {loading ? <span className="loading loading-dots loading-lg text-themeFont" /> : <>
        <section className='w-[25%] bg-bg-light h-screen sticky left-0 top-0'>
          <LeftBox items={items} cost={cost} />
        </section>
        <article className={`${props.class} w-[75%] flex flex-col`}>
          <RightTopBox cost={cost} area = {props.area} landsize={props.landsize} />
          <section className="flex-grow mx-2 my-4">
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
              {Object.keys(items).map((head, i) => {
                return <section key={i} className='my-4 bg-bg-light'>
                  <h1 className='py-3 border-b border-bg-dark text-3xl text-center text-themeFont font-bold'>{head}</h1>
                  {Object.keys(items[head]).map((el, j) => {
                    return <Suspense key={j} fallback={<span className="loading loading-dots loading-lg"></span>}>
                      <CenterBoxItems setCost={setCost} head={head} index={j} item={el} detail={items[head][el]} choice={choice}
                        setChoice={setChoice}></CenterBoxItems>
                    </Suspense>
                  })}
                </section>
              })}
            </section>
          </section>
        </article>
      </>}
    </section>
  );
};

export default Box;

const RightTopBox = (props = {}) => {
  const [total, setTotal] = useState(0);
  let price = 0;

  useEffect(() => {
    Object.keys(props.cost).forEach(el => {
      price += props.cost[el];
    });
    setTotal(price);
  }, [props.cost]);

  return (
    <section className='h-auto p-4 sticky top-0 w-full bg-bg-light text-lightFont z-20 shadow-2xl flex flex-col gap-4'>
      <h1 className='text-2xl font-bold border-b border-double w-fit'>{props.landsize} Construction Cost in {props.area}</h1>
      <div className="stats shadow text-themeFont">
        <div className="stat place-items-center bg-bg-dark border-bg-light">
          <div className="stat-title text-lightFont">Total Cost</div>
          <div className="stat-value">
            {total}
          </div>
        </div>
        <div className="stat place-items-center bg-bg-dark border-bg-light">
          <div className="stat-title text-lightFont">{props.landsize} /Sq Ft</div>
          <div className="stat-value">4,200</div>
        </div>

        <div className="stat place-items-center bg-bg-dark border-bg-light">
          <div className="stat-title text-lightFont">Price Per Sq Ft</div>
          <div className="stat-value">1,200</div>
        </div>
      </div>
    </section>
  );
};

