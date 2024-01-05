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
import { TiTickOutline, TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";
import LazyImage from '@components/Base/lazyImage';

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
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useImmer({});
  const { headings, areas, arealoading } = useSelector(state => state.itemManager)
  const sortedHeadings = Object.keys(headings).sort((a, b) => headings[a].order - headings[b].order);
  const [landTextInfo, setLandTextInfo] = useState({});
  const [rcc, setrcc] = useState('f');
  const [plinth, setplinth] = useState('f');
  const [radday, setradday] = useState(4);
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setChoice(event.target.value);
  };
  const handleToggleShow = () => {
    setShow(!show);
    document.body.style.overflowY = show ? "auto" : "hidden";
  };

  useEffect(() => {
    dispatch(fetchItemsHeadings())
    dispatch(fetchAreas())
    dispatch(fetchLandInfo(props.landsize))
    getUpdatedPriceDate()
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
  useEffect(() => {
    let price = 0;
    Object.keys(cost).forEach(el => {
      price += cost[el];
    });
    setTotal(price);
  }, [cost]);

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
      let jsonDataModule = await import(`/public/landsInfo/${path}.json`);
      let jsonData = jsonDataModule.default;
      setLandTextInfo(prevLandTextInfo => {
        return { ...prevLandTextInfo, ...jsonData };
      });
    } catch (error) {
    }
  }
  async function getUpdatedPriceDate() {
    try {
      let jsonDataModule = await import(`/public/landsInfo/landsCommonInfo.json`);
      let jsonData = jsonDataModule.default;
      setLandTextInfo(prevLandTextInfo => {
        return { ...prevLandTextInfo, ...jsonData };
      });
    } catch (error) {
    }
  }

  return (
    <section className=''>
      {arealoading || cLoading ? <span className="loading loading-dots loading-lg text-themeFont" /> : <>
        <section>
          <button onClick={handleToggleShow}
            className={`z-50 fixed top-1/2 -translate-y-1/2 flex items-center h-24 pr-1 pl-2 bg-bg-dark [#0694c6] rounded-l-lg transition-all duration-500 ${show ? 'right-[92%]' : 'right-0'}`}>
            <BiExpandHorizontal size={25} fill='white' />
          </button>
          <section className={`fixed top-0 z-50 transition-all duration-500 ${show ? 'right-0' : 'right-[-100%]'}
        !h-screen custom-scrollbar w-[92%] bg-bg-1 flex flex-col md:flex-row p-8`}>
            <section className={`w-full md:w-1/2 flex flex-col gap-5 items-center`}>
              <LazyImage className="h-[80px] md:h-[90px] 2xl:h-[120px] w-full object-contain" src="/logos/promodevelopers.gif" />
              <h3 className='mx-auto pb-2 pt-1 px-2 border border-b-4 border-themeFont'>{props.landsize} By Laws</h3>
              <p className='px-2'>Person shall have to leave the following minimum clear spaces including boundary walls.</p>
              {areas[props.area][props.landsize]["ByLaws"] ?
                <ByLawsData available="true" areas={areas} area={props.area} landsize={props.landsize} />
                :
                <ByLawsData available="false" areas={areas} area={props.area} landsize={props.landsize} />
              }
              <section className='hidden md:flex flex-col items-center gap-1 w-full'>
                <div className="h-[2px] w-3/5 bg-themeFont"></div>
                <div className="h-[2px] w-3/5 bg-themeFont"></div>
              </section>
            </section>
            <div className="divider divider-vertical md:divider-horizontal">||</div>
            <section className={`w-full md:w-1/2 h-full md:custom-scrollbar`}>
              <section className='flex flex-col gap-5 mx-2'>
                <h3 className='mx-auto pb-2 pt-1 px-2 border border-b-4 border-themeFont'>Client Selected Items</h3>
                {Object.keys(selectedItems).map((el, i) => {
                  return <section key={i} className='flex justify-between w-full border-b border-gray-300'><p>{el}</p> <p>{formatNumberWithCommas(selectedItems[el] || 0)}</p></section>
                })}
                {/* <button className='my-2 bg-themeFont text-white py-2 px-5'>Print Report</button> */}
                <section className='flex justify-end items-center gap-2 p-2 w-full border-b border-gray-300'>
                  <h3>Total Amount:</h3>
                  <h3>{formatNumberWithCommas(total)}</h3>
                </section>
              </section>
            </section>
          </section>
        </section>
        <section className='flex flex-row justify-center'>
          <section className='hidden lg:block w-[25%] bg-bg max-h-screen sticky top-0'>
            <LeftBox id="my_modal_3" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
          </section>
          <article className={`${props.class} w-full lg:w-[75%] flex flex-col bg-bg`}>
            <RightTopBox total={total} landTextInfo={landTextInfo} areas={areas} cost={cost} area={props.area} landsize={props.landsize} />
            <section className='block lg:hidden w-full bg-bg h-fit'>
              <LeftBox id="my_modal_4" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
            </section>
            <section className="flex-grow px-2 py-4 bg-bg">
              <section className='flex flex-col-reverse gap-4'>
                <section className="bg-bg-1 w-fit mx-auto rounded-2xl text-black text-sm p-4 flex-all-center gap-3">
                  <p>Additional Masonry Work:</p>
                  <section className='flex items-center gap-1'>
                    <input type="number" name="range" id="range" min="0" max="10"
                      className='p-1 w-14 bg-bg rounded-md border border-themeFont'
                      value={radday} onChange={handleRaddayButton} />
                    <p>feets</p>
                  </section>
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
                    <section className='flex items-center gap-1'>
                      <h1><CgOptions className='text-themeFont text-2xl' /></h1>
                      <h3 className='' >Plinth Beam</h3>
                    </section>
                    <input type="checkbox" className="toggle"
                      checked={plinth === 't'}
                      onChange={() => handlePlinthButton()} />
                  </section>
                  <section className="p-3 flex items-center justify-between text-lg font-bold bg-bg-card shadow-lg border border-gray-300">
                    <section className='flex items-center gap-1'>
                      <h1><CgOptions className='text-themeFont text-2xl' /></h1>
                      <h3 className='' >RCC</h3>
                    </section>
                    <input type="checkbox" className="toggle"
                      checked={rcc === 't'}
                      onChange={() => handleRccButton()} />
                  </section>
                </section>
              </section>
            </section>
          </article>
        </section >
      </>}

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
                  <section className='flex gap-2 w-full justify-start items-start lg:hover:scale-110 transition duration-300' key={j}>
                    <TiTickOutline className='text-themeFont hidden xl:block !text-xl min-w-fit max-w-[12%] flex-shrink-0' />
                    <section className="flex gap-1 items-start justify-start flex-col min-w-[88%]">
                      <p className="font-bold min-w-fit">{landTextInfo['Details'][he][sub][0]}:</p>
                      <p >{landTextInfo['Details'][he][sub][1]}</p>
                    </section>
                  </section>
                ))}
              </section>
            })}
            <section className='flex flex-col gap-10'>
              <section className="flex gap-5 items-center">
                <h1 className="pl-1 font-heading min-w-fit">Standard's</h1>
                <span className="w-1/4 h-[2px] bg-bg-dark"></span>
              </section>
              {landTextInfo["Standards"] && Object.keys(landTextInfo['Standards']).map((sub, j) => (
                <section className='flex gap-2 w-full justify-start items-start lg:hover:scale-110 transition duration-300' key={j}>
                  <TiTickOutline className='text-themeFont hidden xl:block !text-xl min-w-fit max-w-[12%] flex-shrink-0' />
                  <section className="flex gap-1 items-start justify-start flex-col min-w-[88%]">
                    <p className="font-bold min-w-fit">{landTextInfo['Standards'][sub][0]}:</p>
                    <p >{landTextInfo['Standards'][sub][1]}</p>
                  </section>
                </section>
              ))}
            </section>
            {landTextInfo["Disclaimer"] && <section className='flex flex-col gap-6 items-center'>
              <section className="flex gap-5 items-center justify-center w-full">
                <span className="w-1/6 h-[2px] bg-bg-dark"></span>
                <h1 className="pl-1 font-heading min-w-fit">Disclaimer</h1>
                <span className="w-1/6 h-[2px] bg-bg-dark"></span>
              </section>
              <section className='w-11/12 sm:w-4/5 flex gap-2 justify-center text-center items-start lg:hover:scale-110 transition duration-300'>
                <p >{landTextInfo['Disclaimer']}</p>
              </section>
            </section>}
          </>)
        }
      </section>
    </section >
  );
};

export default Box;

const RightTopBox = (props = {}) => {


  return (
    <section className='h-auto p-4 sticky top-0 w-full bg-bg text-themeFont text-sm z-20 shadow-2xl flex flex-col gap-4'>
      {/* <h1 className='text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost in {props.area}</h1> */}
      <section className='flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0'>
        <h1 className='text-base sm:text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Grey Structure Construction Cost</h1>
        <p className='text-sm sm:text-base text-black font-themeFont pr-5'>Prices last updated on {props.landTextInfo['LastUpdatePrices']}</p>
      </section>
      <div className="stats shadow text-themeFont w-full overflow-auto">
        <div className="stat py-3 px-3 sm:py-4 sm:px-6 place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">Covered Area /Sq Ft</div>
          <div className="stat-value text-base sm:text-2xl">{props.areas[props.area][props.landsize]['squareFeet'] ? props.areas[props.area][props.landsize]['squareFeet'] : 0}</div>
        </div>
        <div className="stat py-3 px-3 sm:py-4 sm:px-6 place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">Price Per Sq Ft</div>
          <div className="stat-value text-base sm:text-2xl">{Math.round(props.total / props.areas[props.area][props.landsize]['squareFeet']) || 1}</div>
        </div>
        <div className="stat py-3 px-3 sm:py-4 sm:px-6 place-items-center gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm">Total Cost</div>
          <div className="stat-value text-base sm:text-2xl">{formatNumberWithCommas(props.total)}</div>
        </div>
      </div>
    </section>
  );
};

function ByLawsData({ available, areas, area, landsize }) {
  return available == "true" ?
    <section className='flex flex-col w-full gap-5'>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont' >
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Front Side"} :</p>
        {
          areas[area][landsize]["ByLaws"]["Front Side"] == "null" ?
            <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
            </section> :
            <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
            </section>
        }
        {
          areas[area][landsize]["ByLaws"]["Front Side"] != "null" ?
            <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{areas[area][landsize]["ByLaws"]["Front Side"]}</p>
            : <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>
        }
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Rear Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Rear Side"] == "null" ?
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Rear Side"] != "null" ?
          <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{areas[area][landsize]["ByLaws"]["Rear Side"]}</p>
          : <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>}
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Left Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Left Side"] == "null" ?
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Left Side"] != "null" ?
          <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{areas[area][landsize]["ByLaws"]["Left Side"]}</p>
          : <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>}
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Right Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Right Side"] == "null" ?
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Right Side"] != "null" ?
          <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{areas[area][landsize]["ByLaws"]["Right Side"]}</p>
          : <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>}
      </section>
    </section >
    : <section className='flex flex-col w-full gap-5'>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Front Side"} :</p>
        <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Rear Side"} :</p>

        <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Left Side"} :</p>

        <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-themeFont shadow-sm shadow-themeFont'>
        <p className='font-bold min-w-fit flex-1 border-x border-themeFont p-3'>{"Right Side"} :</p>
        <section className='border-r h-full flex-1 border-themeFont p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-themeFont p-3'>{"0"}</p>
      </section>
    </section>

}
