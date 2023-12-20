'use client'
import { Suspense, useEffect, useState } from 'react';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsHeadings, fetchAreas, fetchLandInfo } from '@redux/itemStore';
import { LeftBox } from '@components/Calculator/leftBox'
import { useImmer } from "use-immer";
import { BiExpandHorizontal } from 'react-icons/bi'
import { SiBlockchaindotcom } from 'react-icons/si'
import { CgOptions } from "react-icons/cg";

function formatNumberWithCommas(number) {
  if (number >= 100000) {
    return (number / 100000).toFixed(2).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + 'Lac';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K';
  } else {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}


const Box = (props = {}) => {
  const [show, setShow] = useState(false)
  const [choice, setChoice] = useState('Recomended');
  const [cLoading, setCLoading] = useState(true);
  const [cost, setCost] = useImmer({});
  const [selectedItems, setSelectedItems] = useImmer({});
  const { headings, areas, arealoading } = useSelector(state => state.itemManager)
  const sortedHeadings = Object.keys(headings).sort((a, b) => headings[a].order - headings[b].order);
  const [rcc, setrcc] = useState('f');
  const [plinth, setplinth] = useState('f');
  const [radday, setradday] = useState(0);

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsHeadings())
    dispatch(fetchAreas())
    dispatch(fetchLandInfo(props.landsize))
    return () => { setCLoading(true); }
  }, [])
  useEffect(() => {
    Object.keys(headings).forEach(el => {
      setCost((draft) => {
        draft[el] = 0
      })
    })
    setCLoading(false);
    return () => { setCLoading(true); }
  }, [])

  function handleRccButton() {
    if (rcc == 'f') {
      setrcc('t')
    }
    else {
      setrcc('f')
    }
  }
  function handlePlinthButton() {
    if (plinth == 'f') {
      setplinth('t')
    }
    else {
      setplinth('f')
    }
  }
  function handleRaddayButton(e) {
    setradday(e.target.value)
  }

  return (
    <section className=''>
      <section>
        <button onClick={() => { setShow(!show) }}
          className={`z-10 fixed top-1/2 -translate-y-1/2 flex items-center h-24 pr-1 pl-2 bg-[#0694c6] rounded-l-lg transition-all duration-500 ${show ? 'right-[95%]' : 'right-0'}`}>
          <BiExpandHorizontal size={25} fill='white' />
        </button>
        <section className={`fixed top-0 z-50 transition-all duration-500 ${show ? 'xs:right-0' : 'xs:right-[-100%]'}
        min-h-screen w-[95%] bg-bg-1 flex p-8`}>
          <section className={`w-1/2`}>By Laws Data</section>
          <div className="divider lg:divider-horizontal">||</div>
          <section className={`w-1/2 h-auto`}>
            <section className='flex flex-col gap-3 mx-2 '>
              {Object.keys(selectedItems).map((el, i) => {
                return <section key={i} className='flex justify-between w-full border-b border-gray-300'><p>{el}</p> <p>{formatNumberWithCommas(selectedItems[el] || 0)}</p></section>
              })}
              <button className='my-2 bg-themeFont text-white py-2 px-5'>Print Report</button>
            </section>
          </section>
        </section>
      </section>
      <section className='flex flex-row justify-center'>
        {arealoading || cLoading ? <span className="loading loading-dots loading-lg text-themeFont" /> : <>
          <section className='w-[25%] bg-bg h-screen sticky left-0 top-0'>
            <Suspense fallback={<span className="loading loading-dots loading-lg"></span>}>
              <LeftBox setShow={() => setShow(!show)} items={headings} cost={cost} land={props.landsize} />
            </Suspense>
          </section>
          <article className={`${props.class} w-[75%] flex flex-col bg-bg`}>
            <RightTopBox areas={areas} cost={cost} area={props.area} landsize={props.landsize} />
            <section className="flex-grow px-2 py-4 bg-bg">
              <section className='flex flex-col-reverse gap-4'>
                <section className="bg-bg-1 w-fit mx-auto rounded-2xl text-black text-sm p-4 flex-all-center gap-7">
                  <p>Extra Radday</p>
                  <input type="number" name="range" id="range" min="0" max="10"
                    className='p-1 w-fit bg-bg rounded-md border border-themeFont'
                    value={radday} onChange={handleRaddayButton} />
                </section>
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
              </section>
              <section className="text-black text-sm px-4 pb-4">
                {sortedHeadings.map((head, i) => {
                  return <section key={i} className='my-4'>
                    <section className='p-5 bg-heading border-b border-white font-heading text-heading-txt font-bold flex items-center justify-between'>
                      <h1><SiBlockchaindotcom className='text-white text-3xl' /></h1>
                      <h3 className='' > {head}</h3>
                      <h3 className='font-sans' > {formatNumberWithCommas(cost[head])}</h3>
                    </section>
                    {Object.keys(headings[head]).map((el, j) => {
                      if (el != 'order') {
                        return <Suspense key={j} fallback={<span className="loading loading-dots loading-lg"></span>}>
                          <CenterBoxItems key={j} radday={radday} rcc={rcc} plinth={plinth} setSelectedItems={setSelectedItems} formatNumberWithCommas={(num) => formatNumberWithCommas(num)} setCost={setCost} head={head} index={j} item={el} detail={headings[head][el]} choice={choice} areas={areas} area={props.area} landsize={props.landsize}
                            setChoice={setChoice}></CenterBoxItems>
                        </Suspense>
                      }
                    })}
                  </section>
                })}
                <section className="flex flex-col gap-4">
                  <section className="p-3 flex items-center justify-between text-lg font-bold bg-bg-card shadow-lg border border-gray-300">
                    <section className='flex items-center gap-3'>
                      <h1><CgOptions className='text-themeFont text-2xl' /></h1>
                      <h3 className='' >RCC</h3>
                    </section>
                    <input type="checkbox" className="toggle"
                      checked={rcc === 't'}
                      onChange={() => handleRccButton()} />
                  </section>
                  <section className="p-3 flex items-center justify-between text-lg font-bold bg-bg-card shadow-lg border border-gray-300">
                    <section className='flex items-center gap-3'>
                      <h1><CgOptions className='text-themeFont text-2xl' /></h1>
                      <h3 className='' >Plinth Beam</h3>
                    </section>
                    <input type="checkbox" className="toggle"
                      checked={plinth === 't'}
                      onChange={() => handlePlinthButton()} />
                  </section>
                </section>
              </section>
            </section>
          </article>
        </>}
      </section >
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
    <section className='h-auto p-4 sticky top-0 w-full bg-bg text-black text-sm z-20 shadow-2xl flex flex-col gap-4'>
      <h1 className='text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost in {props.area}</h1>
      <div className="stats shadow text-themeFont">
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">{props.landsize} /Sq Ft</div>
          <div className="stat-value text-2xl">{props.areas[props.area][props.landsize]['squareFeet'] || 0}</div>
        </div>
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">Price Per Sq Ft</div>
          <div className="stat-value text-2xl">{formatNumberWithCommas(total / props.areas[props.area][props.landsize]['squareFeet'] || 1)}</div>
        </div>
        <div className="stat place-items-center bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-sm">Total Cost</div>
          <div className="stat-value text-2xl">
            {formatNumberWithCommas(total)}
          </div>
        </div>
      </div>
    </section>
  );
};

