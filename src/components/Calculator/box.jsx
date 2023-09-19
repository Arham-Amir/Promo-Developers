'use client'
import { Suspense, useEffect, useState } from 'react';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsHeadings, fetchAreas } from '@redux/itemStore';
import { LeftBox } from '@components/Calculator/leftBox'
import { useImmer } from "use-immer";

const Box = (props = {}) => {
  const [choice, setChoice] = useState('Recomended');
  const [cost, setCost] = useImmer({});
  const { loading, headings, areas, arealoading } = useSelector(state => state.itemManager)
  const sortedHeadings = Object.keys(headings).sort((a, b) => headings[a].order - headings[b].order);

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItemsHeadings())
    dispatch(fetchAreas())
  }, [])
  useEffect(() => {
    Object.keys(headings).forEach(el => {
      setCost((draft) => {
        draft[el] = 0
      })
    });
  }, [])

  return (
    <section className='flex flex-row'>
      {loading || arealoading ? <span className="loading loading-dots loading-lg text-themeFont" /> : <>
        <section className='w-[25%] bg-bg h-screen sticky left-0 top-0'>
          <LeftBox items={headings} cost={cost} />
        </section>
        <article className={`${props.class} w-[75%] flex flex-col bg-bg`}>
          <RightTopBox cost={cost} area={props.area} landsize={props.landsize} />
          <section className="flex-grow px-2 py-4 bg-bg">
            <section className="bg-bg-1 w-fit mx-auto rounded-2xl text-black text-sm p-4 flex-all-center gap-7">
              <section className='flex gap-2 items-center'>
                <input type="radio" value={"Recomended"} checked={choice === "Recomended"} onChange={handleOptionChange} name="radio-0" id='r1' className={`radio border-themeFont ${choice == 'Recomended' && '!bg-themeFont'}`} />
                <label htmlFor="r1">Recomended</label>
              </section>
              <section className='flex gap-2 items-center'>
                <input type="radio" value={"Custom"} checked={choice === "Custom"} onChange={handleOptionChange} name="radio-0" id='r2' className={`radio border-themeFont ${choice == 'Custom' && '!bg-themeFont'}`} />
                <label htmlFor="r2">Build Your Own House</label>
              </section>
            </section>
            <section className="text-black text-sm p-4">
              {sortedHeadings.map((head, i) => {
                return <section key={i} className='my-4'>
                  <section className='p-5 bg-heading border-b border-white text-3xl font-heading text-heading-txt font-bold flex items-center justify-between'>
                    <h1 className='' > {head}</h1>
                    <h1 className='' > {cost[head]}</h1>
                  </section>
                  {Object.keys(headings[head]).map((el, j) => {
                    if (el != 'order') {
                      return <Suspense key={j} fallback={<span className="loading loading-dots loading-lg"></span>}>
                        <CenterBoxItems setCost={setCost} head={head} index={j} item={el} detail={headings[head][el]} choice={choice} areas = {areas} area={props.area} landsize={props.landsize}
                          setChoice={setChoice}></CenterBoxItems>
                      </Suspense>
                    }
                  })}
                </section>
              })}

            </section>
          </section>
        </article>
      </>}
    </section >
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
    <section className='h-auto p-4 sticky top-0 w-full bg-bg text-black text-sm z-20 shadow-2xl flex flex-col gap-4'>
      <h1 className='text-2xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Construction Cost in {props.area}</h1>
      <div className="stats shadow text-themeFont">
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">Total Cost</div>
          <div className="stat-value text-3xl">
            {total}
          </div>
        </div>
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">{props.landsize} /Sq Ft</div>
          <div className="stat-value text-3xl">4,200</div>
        </div>
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">Price Per Sq Ft</div>
          <div className="stat-value text-3xl">1,200</div>
        </div>
      </div>
    </section>
  );
};

