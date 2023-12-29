'use client'
import { useEffect, useState } from 'react';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsHeadings, fetchAreas, fetchLandInfo } from '@redux/itemStore';
import { LeftBox } from '@components/Calculator/leftBox'
import { useImmer } from "use-immer";
import { BiExpandHorizontal } from 'react-icons/bi'
import { SiBlockchaindotcom } from 'react-icons/si'
import { CgOptions } from "react-icons/cg";
import { TiTickOutline } from 'react-icons/ti';

function formatNumberWithCommas(number) {
  if (number >= 100000) {
    return (number / 100000).toFixed(2).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ' Lac';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' K';
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
  const [landTextInfo, setLandTextInfo] = useState({});
  const [rcc, setrcc] = useState('f');
  const [plinth, setplinth] = useState('f');
  const [radday, setradday] = useState(0);

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const handleToggleShow = () => {
    setShow(!show);
    document.body.style.overflowY = show ? "auto" : "hidden";
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItemsHeadings())
    dispatch(fetchAreas())
    dispatch(fetchLandInfo(props.landsize))
    getLocalData()
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
  async function getLocalData() {
    const path = props.landsize.split(' ').join('')
    try {
      const jsonDataModule = await import(`/public/landsInfo/${path}.json`);
      const jsonData = jsonDataModule.default;
      setLandTextInfo(jsonData)
    } catch (error) {
      setLandTextInfo({})
    }

  }
  return (
    <section className=''>
      <section>
        <button onClick={handleToggleShow}
          className={`z-10 fixed top-1/2 -translate-y-1/2 flex items-center h-24 pr-1 pl-2 bg-bg-dark [#0694c6] rounded-l-lg transition-all duration-500 ${show ? 'right-[95%]' : 'right-0'}`}>
          <BiExpandHorizontal size={25} fill='white' />
        </button>
        <section className={`fixed top-0 z-50 transition-all duration-500 ${show ? 'right-0' : 'right-[-100%]'}
        h-screen w-[95%] bg-bg-1 flex p-8`}>
          <section className={`w-1/2`}>By Laws Data</section>
          <div className="divider lg:divider-horizontal">||</div>
          <section className={`w-1/2 h-full custom-scrollbar`}>
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
          <section className='hidden lg:block w-[25%] bg-bg max-h-screen sticky top-0'>
            <LeftBox id="my_modal_3" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
          </section>
          <article className={`${props.class} w-full lg:w-[75%] flex flex-col bg-bg`}>
            <RightTopBox landTextInfo={landTextInfo} areas={areas} cost={cost} area={props.area} landsize={props.landsize} />
            <section className='block lg:hidden w-full bg-bg h-fit'>
              <LeftBox id="my_modal_4" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
            </section>
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
                    <section className='p-5 bg-heading border-b border-white text-heading-txt flex items-center justify-between'>
                      <h1><SiBlockchaindotcom className='text-white text-3xl' /></h1>
                      <h3 className='font-heading' > {head}</h3>
                      <h3 className='font-themeFont' > {formatNumberWithCommas(cost[head])}</h3>
                    </section>
                    {headings[head] == "null" ? <p className='p-5'>No Item in this Heading</p>
                      : Object.keys(headings[head]).map((el, j) => {
                        if (el != 'order') {
                          return <CenterBoxItems key={j} radday={radday} rcc={rcc} plinth={plinth} setSelectedItems={setSelectedItems} formatNumberWithCommas={(num) => formatNumberWithCommas(num)} setCost={setCost} head={head} index={j} item={el} detail={headings[head][el]} choice={choice} areas={areas} area={props.area} landsize={props.landsize}
                            setChoice={setChoice}></CenterBoxItems>
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


      <section className="flex flex-col items-center gap-12 w-11/12 md:w-4/5 mx-auto text-themeFont md:my-16">
        {landTextInfo == {} ? <span className="mx-auto loading loading-dots loading-lg text-themeFont" />
          : (<>
            {landTextInfo['Details'] && Object.keys(landTextInfo['Details']).map((he, i) => {
              return <section key={i} className='flex flex-col gap-10'>
                <section className="flex gap-5 items-center">
                  <h1 className="pl-1 font-heading min-w-fit">{he}</h1>
                  <span className="w-1/4 h-[2px] bg-bg-dark"></span>
                </section>
                {landTextInfo['Details'][he] && Object.keys(landTextInfo['Details'][he]).map((sub, j) => (
                  <section className='flex gap-2 w-full justify-start items-start md:hover:scale-110 transition duration-300' key={j}>
                    <TiTickOutline className='text-themeFont hidden sm:block !text-xl min-w-fit max-w-[12%] flex-shrink-0' />
                    <section className="flex gap-1 items-start justify-start flex-col min-w-[88%]">
                      <p className="font-bold min-w-fit">{landTextInfo['Details'][he][sub][0]}:</p>
                      <p >{landTextInfo['Details'][he][sub][1]}</p>
                    </section>
                  </section>
                ))}

              </section>
            })}
            {landTextInfo["Disclaimer"] && <section className='flex flex-col gap-6 items-center'>
              <section className="flex gap-5 items-center justify-center w-full">
                <span className="w-1/6 h-[2px] bg-bg-dark"></span>
                <h1 className="pl-1 font-heading min-w-fit">Disclaimer</h1>
                <span className="w-1/6 h-[2px] bg-bg-dark"></span>
              </section>
              <section className='w-11/12 sm:w-4/5 flex gap-2 justify-center text-center items-start md:hover:scale-110 transition duration-300'>
                <p >{landTextInfo['Disclaimer']}</p>
              </section>
            </section>}
          </>)
        }
      </section>
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
    <section className='h-auto p-4 sticky top-0 w-full bg-bg text-themeFont text-sm z-20 shadow-2xl flex flex-col gap-4'>
      {/* <h1 className='text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost in {props.area}</h1> */}
      <section className='flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0'>
        <h1 className='text-base sm:text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost</h1>
        <p className='text-sm sm:text-base text-black font-themeFont pr-5'>Prices last updated on {props.landTextInfo['LastUpdatePrices']}</p>
      </section>
      <div className="stats shadow text-themeFont w-full overflow-hidden sm:overflow-auto">
        <div className="stat place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">{props.landsize} /Sq Ft</div>
          <div className="stat-value text-base sm:text-2xl">{props.areas[props.area][props.landsize]['squareFeet'] ? props.areas[props.area][props.landsize]['squareFeet'] : 0}</div>
        </div>
        <div className="stat place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">Price Per Sq Ft</div>
          <div className="stat-value text-base sm:text-2xl">{Math.round(total / props.areas[props.area][props.landsize]['squareFeet']) || 1}</div>
        </div>
        <div className="stat place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">Total Cost</div>
          <div className="stat-value text-base sm:text-2xl">{formatNumberWithCommas(total)}</div>
        </div>
      </div>
    </section>
  );
};

