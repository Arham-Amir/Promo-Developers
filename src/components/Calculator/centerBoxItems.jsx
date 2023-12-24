'use client'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CenterBoxItems(props = {}) {
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const quan = Number(props.areas[props.area][props.landsize][props.item]);
  const { landInfo } = useSelector(state => state.itemManager)
  const [quantity, setquantity] = useState(quan);
  const [raddayquantity, setraddayquantity] = useState(0);
  let firstRcc = 0;
  let firstPlinth = 0;

  useEffect(() => {
    if (props.choice === 'Recomended') {
      updatePrice(props.detail['recomended'])
      setCategory(props.detail['recomended']);
    }
  }, [props.choice])
  useEffect(() => {
    props.setSelectedItems((draft) => {
      draft[props.item] = (props.detail[category]?.['price'] || 0) * props.areas[props.area][props.landsize][props.item]
    })
  }, [category])
  useEffect(() => {
    if (Object.keys(landInfo).length != 0) {
      if (props.item in landInfo[props.landsize]["Radday"]) {
        setquantity(prevQuantity => prevQuantity - raddayquantity);
        props.item == "Plumbing" && console.log("1")
        setraddayquantity(Number(landInfo[props.landsize]["Radday"][props.item]) * props.radday);
      }
    }
  }, [props.radday]);
  useEffect(() => {
    setquantity(prevQuantity => prevQuantity + raddayquantity);
    props.item == "Plumbing" && console.log("2")
  }, [raddayquantity])
  useEffect(() => {
    if (Object.keys(landInfo).length != 0) {
      if (props.rcc && firstRcc == 0) {
        firstRcc = 1;
      }
      if (props.item in landInfo[props.landsize]["RCC"] && firstRcc) {
        if (props.rcc == "t") {
          setquantity(prevQuantity => prevQuantity + Number(landInfo[props.landsize]["RCC"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
        else {
          setquantity(prevQuantity => prevQuantity - Number(landInfo[props.landsize]["RCC"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
      }
    }
  }, [props.rcc]);
  useEffect(() => {
    if (Object.keys(landInfo).length != 0) {
      if (props.plinth && firstPlinth == 0) {
        firstPlinth = 1;
      }
      if (props.item in landInfo[props.landsize]["PlinthADD"] && firstPlinth) {
        if (props.plinth == "t") {
          setquantity(prevQuantity => prevQuantity + Number(landInfo[props.landsize]["PlinthADD"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
        else {
          setquantity(prevQuantity => prevQuantity - Number(landInfo[props.landsize]["PlinthADD"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
      }
      if (props.item in landInfo[props.landsize]["PlinthSUB"] && firstPlinth) {
        if (props.plinth == "t") {
          setquantity(prevQuantity => prevQuantity - Number(landInfo[props.landsize]["PlinthSUB"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
        else {
          setquantity(prevQuantity => prevQuantity + Number(landInfo[props.landsize]["PlinthSUB"][props.item]));
          props.item == "Plumbing" && console.log("1")
        }
      }
    }
  }, [props.plinth]);

  function updatePrice(cat) {
    props.setCost((draft) => {
      if (category) {
        draft[props.head] -= Number(props.detail[category]?.['price'] * quantity)
        draft[props.head] += Number(props.detail[cat]?.['price'] * quantity)
      }
      else if (cat) {
        if (draft[props.head]) {
          draft[props.head] += Number(props.detail[cat]?.['price'] * quantity)
        }
        else {
          draft[props.head] = Number(props.detail[cat]?.['price'] * quantity)
        }
      }
    })
  }
  function handleCategoryChange(cat) {
    if (props.choice === 'Recomended') {
      props.setChoice('Custom');
    }
    updatePrice(cat);
    setCategory(cat);
  };
  return (
    <section className='shadow-lg border border-gray-300'>
      <div className={`transition-all !duration-500 collapse collapse-arrow bg-bg rounded-none border-b border-b-gray-400`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input type="radio"
          name={`my-accordion-${props.index}`}
          checked={isOpen}
          onChange={() => { }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="transition-all !duration-500 collapse-title flex items-center justify-between text-lg font-bold bg-bg-card">
          <p>{props.item}</p>
          <p className='text-sm'>{props.formatNumberWithCommas(props.detail[category]?.['price'] * quantity || 0)}</p>
        </div>
        <div className="transition-all !duration-500 collapse-content bg-bg-card/20 flex flex-col gap-2">
          <section className='flex items-center gap-10 font-bold border-y-2 py-2 border-dashed border-gray-400 my-3'>
            <h3>Quantity : </h3>
            <p>{quantity}</p>
          </section>
          <section className='flex font-bold'>
            <p className='flex-1'>Category</p>
            <p className='flex-1'>Name</p>
            <p className='flex-1'>Price</p>
          </section>
          <div className="divider my-1 before:bg-gray-400 after:bg-gray-400"></div>
          {Object.keys(props.detail).map((el, i) => {
            if (el != 'recomended') {
              return (
                <section key={i} className={`${el == category && 'bg-bg-card'}`}>
                  <section className='flex items-center'>
                    <button onClick={() => handleCategoryChange(el)}
                      className={`text-start flex-1 py-[1px] ${el == category && 'text-themeFont font-bold'}`}>{el}</button>
                    <p className='flex-1 py-[1px]'>{props.detail[el]['name']}</p>
                    <p className='flex-1 py-[1px]'>{props.formatNumberWithCommas(props.detail[el]?.['price'] || 0)}</p>
                  </section>
                </section>
              )
            }
          })}
        </div>
      </div>
    </section>
  );
}
