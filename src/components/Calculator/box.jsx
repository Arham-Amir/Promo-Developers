'use client'
import { useEffect, useRef, useState } from 'react';
import LazyImage from '@components/Base/lazyImage';
import CenterBoxItems from '@components/Calculator/centerBoxItems';
import { LeftBox } from '@components/Calculator/leftBox'
import ContactInfo from "@components/Base/ContactUs/contactInfo";
import { useImmer } from "use-immer";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsHeadings, fetchAreas, fetchLandInfo, getDate, ItemManagerActions } from '@redux/itemStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BiExpandHorizontal } from 'react-icons/bi'
import { SiBlockchaindotcom } from 'react-icons/si'
import { CgOptions } from "react-icons/cg";
import { TiTickOutline, TiTick } from 'react-icons/ti';
import { ImCross } from "react-icons/im";
import { toast } from 'react-toastify';

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
  const { headings, areas, arealoading, lastPriceUpdateDate, dateloading } = useSelector(state => state.itemManager)
  const sortedHeadings = Object.keys(headings).sort((a, b) => headings[a].order - headings[b].order);
  const [sortedData, setSortedData] = useState({});
  const [landTextInfo, setLandTextInfo] = useState({});
  const [rcc, setrcc] = useState('n');
  const [plinth, setplinth] = useState('n');
  const [radday, setradday] = useState(0);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const printRef = useRef(null);
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
    dispatch(getDate())
    dispatch(fetchLandInfo(props.landsize))
    dispatch(fetchAreas())
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
    // setCLoading(false);
    return () => { setCLoading(true); }
  }, [])
  useEffect(() => {
    if (headings != {}) {
      Object.keys(headings).forEach(el => {
        setSortedData((prevSortedData) => ({
          ...prevSortedData,
          [el]: sortItems(el),
        }));
      })
      setCLoading(false);
      setradday(3);
    }
    return () => { setCLoading(true); }
  }, [headings])
  useEffect(() => {
    let price = 0;
    Object.keys(cost).forEach(el => {
      price += cost[el];
    });
    setTotal(price);
  }, [cost]);

  function sortItems(category) {
    const sortedEntries = Object.entries(headings[category]).sort((a, b) => {
      const orderA = a[1].order || 0;
      const orderB = b[1].order || 0;
      return orderA - orderB;
    });
    const sortedNames = sortedEntries.map(([name]) => name);
    setSortedData(prevData => ({ ...prevData, [category]: sortedNames }));
    return {};
  }
  function handleRccButton() {
    if (rcc == 'f' || rcc == 'n') {
      setrcc('t')
    }
    else {
      setrcc('f')
    }
  }
  function handlePlinthButton() {
    if (plinth == 'f' || plinth == 'n') {
      setplinth('t')
    }
    else {
      setplinth('f')
    }
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
  const handleRaddayButton = (e) => {
    let newValue = parseInt(e.target.value, 10);

    if (newValue < 0) {
      setradday(0)
    }
    else if (newValue > 10) {
      setradday(10)
    }
    else if (newValue >= 0 && newValue <= 10) {
      setradday(newValue)
    }
  };
  function printDocument() {
    if (username == '' || phonenumber == '') {
      toast.error('Please Complete All Form Fields First.');
    }
    else {
      const currentDateAndTime = new Date();
      const dateWithoutGMT = String(currentDateAndTime).split(' GMT')[0];
      const compactUniqueId = currentDateAndTime.toISOString().replace(/[-:T.]/g, '');

      dispatch(ItemManagerActions.addUserForLog(
        {
          'id': compactUniqueId,
          'data': {
            "UserName": username,
            "UserNumber": phonenumber,
            "UserEmail": email,
            "UserDate": dateWithoutGMT,
            "Land": props.landsize,
            "Area": props.area
          }
        }
      ))

      const element = printRef.current;
      if (element) {
        const divHeight = element.clientHeight;

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [794, divHeight],
        });

        html2canvas(element).then((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg');
          pdf.addImage(imgData, 'JPEG', 0, 0, 794, divHeight);
          pdf.save('Promo Developers.pdf');
        });
      }
      setEmail("")
      setUsername("")
      setPhoneNumber("")
      document.getElementById("reportPrint").close()
    }
  }

  return (<>
    <section className='max-w-screen'>
      {
        arealoading || cLoading ?
          <section className='w-screen flex justify-center'>
            <span className="loading loading-dots loading-lg text-black" />
          </section>
          : <>
            <section>
              <button onClick={handleToggleShow}
                className={`z-50 fixed top-1/2 -translate-y-1/2 flex items-center h-24 pr-1 pl-2 bg-bg-dark [#0694c6] rounded-l-lg transition-all duration-500 ${show ? 'right-[92%]' : 'right-0'}`}>
                <BiExpandHorizontal size={25} fill='white' />
              </button>
              <section className={`fixed top-0 z-50 transition-all duration-500 ${show ? 'right-0' : 'right-[-100%]'}
        !h-screen custom-scrollbar w-[92%] bg-bg-1 flex flex-col md:flex-row p-8`}>
                <section className={`w-full md:w-1/2 flex flex-col gap-5 items-center`}>
                  <LazyImage className="h-[80px] md:h-[90px] 2xl:h-[120px] w-full object-contain" src="/logos/promodev.png" />
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
                <section className={`w-full md:w-1/2 pb-10 h-full md:custom-scrollbar`}>
                  <section className='flex flex-col gap-5 mx-2'>
                    <h3 className='mx-auto pb-2 pt-1 px-2 border border-b-4 border-themeFont'>Client Selected Items</h3>
                    {Object.keys(selectedItems).map((el, i) => {
                      return <section key={i} className='flex justify-between w-full border-b border-gray-300'><p>{el}</p> <p>{formatNumberWithCommas(selectedItems[el]["totalPrice"] || 0)}</p></section>
                    })}
                    <section className='flex justify-end items-center gap-2 p-2 w-full border-b border-gray-300'>
                      <h3>Total Amount:</h3>
                      <h3>{formatNumberWithCommas(total)}</h3>
                    </section>
                    <section className='flex justify-end  w-full'>
                      <button onClick={() => document.getElementById("reportPrint").showModal()} className='my-2 bg-themeFont text-white py-2 px-5'>Print Report</button>
                      <dialog id={`reportPrint`} className="m-auto modal w-fit h-auto">
                        <div className="modal-box flex flex-col gap-5 items-center w-full h-auto">
                          <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">✕</button>
                          </form>
                          <div className="modal-box w-full min-h-[80vh] h-fit bg-bgLight flex flex-col gap-3 bg-bg-1">
                            <p className='text-xs ms:px-5 text-center uppercase'>Please fill below fields to get report.</p>
                            <section className='flex flex-col gap-1'>
                              <p className="text-base ms:text-2xl font-heading font-bold">Name: <span className='text-red-700'>*</span></p>
                              <input value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='rounded-lg text-base mx-4 px-4 py-1' type="text" name="Name" id="username" />
                            </section>

                            <section className='flex flex-col gap-1'>
                              <p className="text-base ms:text-2xl font-heading font-bold">Phone Number: <span className='text-red-700'>*</span></p>
                              <input value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='rounded-lg text-base mx-4 px-4 py-1' type="tel" name="Number" id="phonenumber" />
                            </section>
                            <section className='flex flex-col gap-1'>
                              <p className="text-base ms:text-2xl font-heading font-bold">Email:</p>
                              <input value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='rounded-lg text-base mx-4 px-4 py-1' type="email" name="Email" id="email" />
                            </section>
                            <section className='flex flex-row justify-around gap-1'>
                              <button onClick={printDocument} className='btn-sm md:btn-md btn border-0 bg-themeColor hover:bg-themeFont hover:text-white'>Submit</button>
                            </section>
                          </div>
                        </div>
                      </dialog>
                    </section>
                  </section>
                </section>
              </section>
            </section>

            <section className='flex flex-row justify-center'>
              <section className='hidden lg:block w-[25%] bg-bg max-h-screen sticky top-0 left-0'>
                <LeftBox id="my_modal_3" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
              </section>
              <article className={`${props.class} w-full lg:w-[75%] flex flex-col bg-bg`}>
                <RightTopBox lastPriceUpdateDate={lastPriceUpdateDate} dateloading={dateloading} total={total} landTextInfo={landTextInfo} areas={areas} cost={cost} area={props.area} landsize={props.landsize} />
                <section className='block lg:hidden w-full bg-bg h-fit'>
                  <LeftBox id="my_modal_4" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea={props.area} land={props.landsize} />
                </section>
                <section className="flex-grow px-2 py-4 bg-bg">
                  <section className='flex flex-col-reverse gap-4 pb-8 lg:pb-0'>
                    <section className="relative bg-bg-1 w-fit mx-auto rounded-2xl text-black text-sm p-4 flex-all-center gap-3">
                      <div className='text-xs md:text-sm lg:text-base'>Plot Depth:
                        <div className="z-20 tooltip tooltip-close" data-tip="From road level to NSL level">
                          <button className="font-bold p-0 text-xl text-red-600">*</button>
                        </div>
                      </div>

                      <section className='flex items-center gap-1'>
                        <input type="text" name="range" id="range" min="0" max="10"
                          className='p-1 w-14 bg-bg rounded-md border border-themeFont'
                          onWheel={(e) => e.preventDefault()}
                          onKeyDown={(e) => {
                            (e.key === 'ArrowUp' || e.key === 'ArrowDown') && e.preventDefault();
                            e.key === 'Backspace' && setradday(0)
                          }}
                          value={radday} onChange={handleRaddayButton}
                        />
                        <p>feets</p>
                      </section>
                    </section>
                    <section className="bg-bg-1 w-fit mx-auto rounded-2xl text-black text-sm p-4 flex-all-center flex-col sm:flex-row gap-7">
                      <section className='flex gap-2 items-center'>
                        <input type="radio" value={"Recomended"} checked={choice != "Custom"} onChange={handleOptionChange} name="radio-0" id='r1' className={`radio border-themeFont ${choice == 'Recomended' && '!bg-themeFont'}`} />
                        <select value={choice} className='min-w-max border-themeFont p-1 bg-transparent bg-bg-1 text-themeFont before:text-themeFont after:text-themeFont' onChange={handleOptionChange}>
                          <option className='text-base' value="Recomended">Recomended</option>
                          <option className='text-base' value="minimum">Minimum Price</option>
                          <option className='text-base' value="maximum">Maximum Price</option>
                        </select>
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
                        <section className='p-5 gap-2 bg-heading border-b border-white text-heading-txt flex items-center justify-between'>
                          <h1><SiBlockchaindotcom className='text-white text-3xl' /></h1>
                          <h3 className='font-heading' > {head}</h3>
                          <h3 className='font-themeFont' > {formatNumberWithCommas(cost[head])}</h3>
                        </section>
                        <section>
                          {headings[head] == "null" ? <p className='p-5'>No Item in this Heading</p>
                            : (typeof sortedData[head] === 'object' && sortedData[head] !== null && sortedData[head].constructor === Array) && sortedData[head].map((el, j) => {
                              if (el != 'order') {
                                return <CenterBoxItems key={(i + 1) * j} radday={radday} rcc={rcc} plinth={plinth} setSelectedItems={setSelectedItems} formatNumberWithCommas={(num) => formatNumberWithCommas(num)} setCost={setCost} head={head} index={j} item={el} detail={headings[head][el]} choice={choice} areas={areas} area={props.area} landsize={props.landsize} setradday={setradday}
                                  setChoice={setChoice}></CenterBoxItems>
                              }
                            })}
                        </section>
                      </section>
                    })}
                    <section className="flex flex-col gap-4">
                      <section className="p-3 flex items-center justify-between text-lg font-bold bg-bg-card shadow-lg border border-gray-300">
                        <section className='flex items-center gap-1'>
                          <h1><CgOptions className='text-black text-2xl' /></h1>
                          <h3 className='' >Plinth Beam</h3>
                        </section>
                        <input type="checkbox" className="toggle"
                          checked={plinth === 't'}
                          onChange={() => handlePlinthButton()} />
                      </section>
                      <section className="p-3 flex items-center justify-between text-lg font-bold bg-bg-card shadow-lg border border-gray-300">
                        <section className='flex items-center gap-1'>
                          <h1><CgOptions className='text-themeFont text-2xl' /></h1>
                          <h3 className='' >RCC Bed</h3>
                        </section>
                        <input type="checkbox" className="toggle"
                          checked={rcc === 't'}
                          onChange={() => handleRccButton()} />
                      </section>
                    </section>
                    <section className='mt-4 w-full flex justify-end'>
                      <button onClick={() => document.getElementById("reportPrint").showModal()}
                        className='bg-themeFont text-white text-base'>Print Report</button>
                    </section >

                  </section>
                </section>
              </article>
            </section >
          </>
      }
      <section className="flex flex-col items-center gap-12 w-11/12 md:w-4/5 mx-auto text-themeFont md:my-16">
        {landTextInfo == {} ? <span className="mx-auto loading loading-dots loading-lg text-themeFont" />
          : (<>
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

    {!(arealoading || cLoading) &&
      <section ref={printRef} className='fixed bottom-full p-2 bg-white w-[595px] h-auto mx-auto'>
        <section className='gap-6 flex items-center justify-center flex-col p-1 border-2 border-black'>
          <PrintScreen selectedItems={selectedItems} lastPriceUpdateDate={lastPriceUpdateDate} dateloading={dateloading} total={total} landTextInfo={landTextInfo} areas={areas} cost={cost} area={props.area} landsize={props.landsize}
          />
        </section>
      </section>
    }
  </>
  );
};

export default Box;

const RightTopBox = (props = {}) => {
  return (
    <section className='h-auto p-4 pt-0 lg:pt-4 lg:ml-4 sticky top-0 right-0 max-w-full bg-bg text-themeFont text-sm z-40 shadow-2xl flex flex-col gap-4 overflow-x-hidden'>
      {/* <h1 className='text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost in {props.area}</h1> */}
      <section className='flex flex-col justify-between gap-4 '>
        <h1 className='text-base sm:text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Grey Structure Construction Cost</h1>
        {props.dateloading ? <span className="loading loading-dots loading-lg text-themeFont" /> :
          <p className='text-sm sm:text-base text-black font-themeFont pr-5'>Prices last updated on {props.lastPriceUpdateDate}</p>
        }
      </section>
      <div className="stats shadow text-themeFont w-full overflow-auto">
        <div className="flex-all-center flex-col py-3 px-3 sm:py-4 sm:px-6 gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title h-1/2 text-black text-xs sm:text-sm">Area ( Sq Ft )
            <div className="z-20 tooltip tooltip-close tooltip-right" data-tip="Covered Area + (Open Area / 2)">
              <button className="font-bold p-0 text-xl text-red-600">*</button>
            </div>
          </div>
          <div className="stat-value h-1/2 text-base sm:text-2xl">{props.areas[props.area][props.landsize]['squareFeet'] ? props.areas[props.area][props.landsize]['squareFeet'] : 0}</div>
        </div>
        <div className="flex-all-center flex-col py-3 px-3 sm:py-4 sm:px-6 gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm pt-1">Price Per Sq Ft</div>
          <div className="stat-value text-base sm:text-2xl">{Math.round(props.total / props.areas[props.area][props.landsize]['squareFeet']) || 1}</div>
        </div>
        <div className="flex-all-center flex-col py-3 px-3 sm:py-4 sm:px-6 gap-1 bg-bg-1 border-bg-light">
          <div className="stat-title text-black text-xs sm:text-sm pt-1">Total Cost</div>
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

function PrintScreen({ lastPriceUpdateDate, dateloading, total, landTextInfo, areas, cost, area, landsize, selectedItems }) {
  return <>
    <LazyImage className="w-[120px] pt-6 object-contain" src="/logos/promodev.png" />
    <PrintTotalDetailBox lastPriceUpdateDate={lastPriceUpdateDate} dateloading={dateloading} total={total} landTextInfo={landTextInfo} areas={areas} cost={cost} area={area} landsize={landsize} />
    <section className={`w-4/5 mx-auto flex flex-col gap-5 items-center text-black`}>
      <h3 className='mx-auto p-2 border border-b-4 border-black'>{landsize} By Laws</h3>
      <p className='px-2'>Person shall have to leave the following minimum clear spaces including boundary walls.</p>
      {areas[area][landsize]["ByLaws"] ?
        <PrintByLawsData available="true" areas={areas} area={area} landsize={landsize} />
        :
        <PrintByLawsData available="false" areas={areas} area={area} landsize={landsize} />
      }
      <section className='flex flex-col items-center gap-1 w-full'>
        <div className="h-[2px] w-3/5 bg-black"></div>
        <div className="h-[2px] w-3/5 bg-black"></div>
      </section>
    </section>
    <PrintCategoryPrices cost={cost} />
    <PrintSelectedDetails selectedItems={selectedItems} total={total} />
    <PrintAbout />
  </>
}

const PrintTotalDetailBox = (props = {}) => {
  return (
    <section className='h-auto p-4 pt-0 max-w-full text-black z-20 flex flex-col gap-4'>
      <section className='flex flex-col justify-between gap-4 '>
        <h1 className='text-lg font-bold underline underline-offset-4 w-fit'>{props.landsize} Double Story Grey Structure Construction Cost</h1>
        {props.dateloading ? <span className="loading loading-dots loading-lg" /> :
          <p className='text-sm pr-5'>Prices last updated on: {props.lastPriceUpdateDate}</p>
        }
      </section>
      <div className="stats w-full overflow-auto bg-slate-200 text-black pb-1">
        <div className="stat p-3 place-items-center gap-1 border-black">
          <div className="stat-title text-sm text-black">Covered Area /Sq Ft</div>
          <div className="stat-value text-2xl">{props.areas[props.area][props.landsize]['squareFeet'] ? props.areas[props.area][props.landsize]['squareFeet'] : 0}</div>
        </div>
        <div className="stat p-3 place-items-center gap-1 border-black">
          <div className="stat-title text-sm text-black">Price Per Sq Ft</div>
          <div className="stat-value text-2xl">{Math.round(props.total / props.areas[props.area][props.landsize]['squareFeet']) || 1}</div>
        </div>
        <div className="stat p-3 place-items-center gap-1 border-black">
          <div className="stat-title text-sm text-black">Total Cost</div>
          <div className="stat-value text-2xl">{formatNumberWithCommas(props.total)}</div>
        </div>
      </div>
    </section>
  );
};
function PrintByLawsData({ available, areas, area, landsize }) {
  return available == "true" ?
    <section className='flex flex-col w-full gap-5 text-black'>
      <section className='flex items-center justify-between w-full border-y border-black' >
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Front Side"} :</p>
        {
          areas[area][landsize]["ByLaws"]["Front Side"] == "null" ?
            <section className='h-full flex-1 p-3 flex-all-center'>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
              <p><ImCross className='text-sm text-red-700 w-5' /></p>
            </section> :
            <section className='h-full flex-1 p-3 flex-all-center'>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
              <p><TiTick className='text-xl text-green-600 w-5' /></p>
            </section>
        }
        {
          areas[area][landsize]["ByLaws"]["Front Side"] != "null" ?
            <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{areas[area][landsize]["ByLaws"]["Front Side"]}</p>
            : <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>
        }
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Rear Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Rear Side"] == "null" ?
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Rear Side"] != "null" ?
          <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{areas[area][landsize]["ByLaws"]["Rear Side"]}</p>
          : <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>}
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Left Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Left Side"] == "null" ?
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Left Side"] != "null" ?
          <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{areas[area][landsize]["ByLaws"]["Left Side"]}</p>
          : <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>}
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Right Side"} :</p>
        {areas[area][landsize]["ByLaws"]["Right Side"] == "null" ?
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
            <p><ImCross className='text-sm text-red-700 w-5' /></p>
          </section> :
          <section className='h-full flex-1 p-3 flex-all-center'>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
            <p><TiTick className='text-xl text-green-600 w-5' /></p>
          </section>}
        {areas[area][landsize]["ByLaws"]["Right Side"] != "null" ?
          <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{areas[area][landsize]["ByLaws"]["Right Side"]}</p>
          : <p className='border-x min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>}
      </section>
    </section >
    : <section className='flex flex-col w-full gap-5 text-black'>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Front Side"} :</p>
        <section className='border-r h-full flex-1 border-black p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Rear Side"} :</p>

        <section className='border-r h-full flex-1 border-black p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Left Side"} :</p>

        <section className='border-r h-full flex-1 border-black p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>
      </section>
      <section className='flex items-center justify-between w-full border-y border-black'>
        <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>{"Right Side"} :</p>
        <section className='border-r h-full flex-1 border-black p-3 flex-all-center'>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
          <p><ImCross className='text-sm text-red-700 w-5' /></p>
        </section>
        <p className='border-r min-w-fit flex-1 text-center border-black p-3'>{"0"}</p>
      </section>
    </section>

}
function PrintCategoryPrices({ cost }) {
  return <section className='flex flex-col gap-5 w-4/5 text-black'>
    <h3 className='mx-auto p-2 border border-b-4 border-black'>Summary</h3>
    <section className='flex items-center justify-between w-full border-y border-black bg-slate-400' >
      <p className='font-bold min-w-fit flex-1 border-x border-black flex-all-center p-3'>Categories</p>
      <p className='font-bold min-w-fit flex-1 border-r border-black flex-all-center p-3'>Total Price</p>
    </section>
    {Object.keys(cost).map((el, i) => (
      <section key={i} className={`${i % 2 != 0 && 'bg-slate-200'} flex items-center justify-between w-full border-b border-black`} >
        <p className='text-sm min-w-fit flex-1 border-x border-black flex-all-center p-3'>{el}</p>
        <p className='text-sm min-w-fit flex-1 border-r border-black flex-all-center p-3'>{formatNumberWithCommas(cost[el] || 0)}</p>
      </section>
    ))}
  </section>
}
function PrintSelectedDetails({ selectedItems, total }) {
  return <section className={`w-11/12 mx-auto h-auto text-black`}>
    <section className='flex flex-col gap-5 mx-2 w-full'>
      <h3 className='mx-auto p-2 border border-b-4 border-black'>BOQ</h3>
      <table className='w-full border-t border-l border-black'>
        <thead>
          <tr className='flex border-b border-black bg-slate-400'>
            <th className='py-2 w-6 text-ceneter text-[10px] border-r border-black'>Id</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>Item</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>Category</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>CategoryName</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>PricePerUnit</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>Quantity</th>
            <th className='py-2 flex-1 text-ceneter text-[10px] border-r border-black'>TotalPrice</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedItems).map((el, i) => {
            return <tr key={i} className={`${i % 2 != 0 && 'bg-slate-200'} flex border-b border-black`}>
              <td className='py-1 w-6 text-start text-[10px] border-r border-black'>{i + 1}.</td>
              <td className='py-1 flex-1 text-start text-[10px] border-r border-black'>{el}</td>
              {Object.keys(selectedItems[el]).map((data, j) => {
                return <td key={j} className='py-1 flex-1 text-start text-[10px] border-r border-black'>{selectedItems[el][data]}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
      <section className='flex justify-end items-center gap-2 p-2 w-full'>
        <p className='font-bold'>Total Amount:</p>
        <p className='font-bold'>{formatNumberWithCommas(total)}</p>
      </section>
    </section>
  </section>
}
function PrintAbout() {
  return <section className='w-full flex flex-col'>
    <section className="grid w-5/6 h-auto mx-auto grid-cols-2 gap-6 pb-6">
      <ContactInfo>
        <p className='text-xs w-fit text-center font-bold flex flex-col'>Telephone: <span className='font-normal'>+92 42 37512219</span></p>
      </ContactInfo>
      <ContactInfo>
        <p className='text-xs w-fit text-center font-bold flex flex-col'>Whatsapp: <span className='font-normal'>+92 328 4480831 </span></p>
      </ContactInfo>
      <ContactInfo>
        <p className='text-xs w-fit text-center font-bold flex flex-col'>Email: <span className='font-normal'>info@promodevelopers.com</span><span className='font-normal'>promoestateanddeveloper@gmail.com</span></p>
      </ContactInfo>
      <ContactInfo>
        <p className='text-xs w-fit text-center font-bold flex flex-col'>Address: <span className='font-normal'>60-J Block, DHA EME Sector, Multan Road, Lahore, Pakistan</span></p>
      </ContactInfo>
    </section>
    <section className='w-full bg-black py-1 pb-2 text-white flex-all-center'>
      <p className='md:text-sm text-center'>www.promodevelopers.com</p>
    </section>
  </section>
}
