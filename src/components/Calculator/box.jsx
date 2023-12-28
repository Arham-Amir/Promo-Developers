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
  const [rcc, setrcc] = useState('f');
  const [plinth, setplinth] = useState('f');
  const [radday, setradday] = useState(0);
  const construction_materials = [
    ["Bricks", "Class A+ bricks are advised for usage in building a home. The grey structure will take about 30K – 35K bricks to build."],
    ["Crush", "Class A+ Crush Like Sargodha (3 Suter or ½ Down) is advised for usage in building a home. Approximately 1000 - 1200 cubic feet of crush would be needed."],
    ["Sand", "Ravi sand recommended for masonry works and concrete works. Usually Chenab sand used in plaster works. Approximately 1500 -1800 cubic feet of Ravi sand will be required. In addition, 300 -500 cubic feet of Chenab sand are needed for plastering."],
    ["Cement", "Class A+ Cement Like Maple Leaf, Best Way, and DG are advised for usage in building a home. Around 350 - 400 bags of regular Portland cement will be required."],
    ["Kassu", "Additionally, you'll need Kassu, a clay and sand mixture. It is frequently utilized to cover the open space. Its measurement depends on the depth of the plot. Normally 2.5K – 3K cubic feet Kassu needed to construct a five-marla home in Lahore."],
    ["Rebar / Steel / Sariya", "Class A+ Steel Like Mughal, Amreli, and Moiz {(40 or 60 Grade), (3 or 4 or 6 Sutar) are advised for usage in building a home. In addition, 1.5 – 1.8 tons of rebar will be required."],
    ["Safety Grills", "Normally (14 or 16 or 18 Gauge) Safety Grills are available in the market. (16 Gauge is recommended). Around it covered 175 - 200 Square feet of area."],
    ["Chokat", "Normally (14 or 16 or 18 Gauge) Steel Chokat is available in the market. (16 Gauge is recommended). Around it covered 270 - 300 Square feet of area."],
    ["PCC", "The term PCC refers to plain cement concrete. The amalgamation of cement, fine aggregate, and coarse aggregate are known as plain cement concrete (PCC). Normally its ratio Is 1:4:8 (Cement, sand, and Crush)."],
    ["DPC", "A damp-proof course (DPC) is a barrier through the structure designed to prevent moisture rising by capillary action such as through a phenomenon known as rising damp. Normally its ratio Is 1:2:4 (Cement, sand, and Crush)."],
    ["Plinth Beam Work", "A damp-proof course (DPC) is a barrier through the structure designed to prevent moisture rising by capillary action such as through a phenomenon known as rising damp. Normally its ratio Is 1:2:4 (Cement, sand, and Crush)."],
    ["PCC for 5 Marla", "Normally... Kg of Steel, ... of bags of cement, ....... cubic feet of sand, and ....... cubic feet of crush is required for 5 Marla PCC work."],
    ["Masonry Work", "Masonry is a construction technique that involves stacking materials, such as bricks, stone blocks or concrete blocks, on top of one another to build structures or walls. Masons layer these materials using mortar, an adhesive paste that fills the gaps and binds materials together. Masonry work includes Brick, Cement, and sand as material. Normally Mortar ratio Is 1:4 (Cement and Sand)."],
    ["Plaster Work", "Plastering is the process of covering rough walls and uneven surfaces in the construction of houses and other structures with a plastic material, called plaster, which is a mixture of cement and sand along with the required quantity of water. Plaster work includes Brick, Cement, and sand. Normally Mortar ratio Is 1:4 (Cement and Sand). Normally its ratio Is 1:4 (Cement, sand, and Crush)."],
    ["Slab Poring Work", "Masonry is a construction technique that involves stacking materials, such as bricks, stone blocks or concrete blocks, on top of one another to build structures or walls. Masons layer these materials using mortar, an adhesive paste that fills the gaps and binds materials together. Masonry work includes Steel, Cement, sand, and Crush as material. Normally Mortar ratio Is 1:2:4 (Cement, Sand and Cush). Normally its ratio Is 1:2:4 (Cement, sand, and Crush)."]
  ]

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
            <LeftBox id="my_modal_3" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea= {props.area} land={props.landsize} />
          </section>
          <article className={`${props.class} w-full lg:w-[75%] flex flex-col bg-bg`}>
            <RightTopBox areas={areas} cost={cost} area={props.area} landsize={props.landsize} />
            <section className='block lg:hidden w-full bg-bg h-fit'>
              <LeftBox id="my_modal_4" formatNumberWithCommas={formatNumberWithCommas} setShow={() => setShow(!show)} items={headings} cost={cost} sarea= {props.area} land={props.landsize} />
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
                    :Object.keys(headings[head]).map((el, j) => {
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

      <section className="flex flex-col gap-12 w-11/12 md:w-4/5 mx-auto text-themeFont md:mt-16">
        <section className="flex gap-5 items-center">
          <h1 className="pl-1 font-heading min-w-fit">Standards</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        {construction_materials.map((e, i) => (
          <section className='flex gap-2 items-start md:hover:scale-110 transition duration-300' key={i}>
            <TiTickOutline className='text-themeFont !text-xl min-w-fit' />
            <section className="flex gap-1 items-start justify-start flex-col">
              <p className="font-bold min-w-fit">{e[0]}:</p>
              <p >{e[1]}</p>
            </section>
          </section>
        ))}
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
    <section className='h-auto p-4 sticky top-0 w-full bg-bg text-black text-sm z-20 shadow-2xl flex flex-col gap-4'>
      {/* <h1 className='text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost in {props.area}</h1> */}
      <section className='flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0'>
        <h1 className='text-base sm:text-xl font-bold border-b border-themeFont border-double w-fit'>{props.landsize} Double Story Construction Cost</h1>
        <p className='text-sm sm:text-base text-black font-themeFont pr-5'>Prices last updated on 19th December, 2023</p>
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

