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
      if (landInfo[props.landsize]["Radday"] && props.item in landInfo[props.landsize]["Radday"]) {
        updateTotalPriceAndQuantity(quantity - raddayquantity)
        setraddayquantity(Number(landInfo[props.landsize]["Radday"][props.item]) * props.radday);
      }
    }
  }, [props.radday]);
  useEffect(() => {
    updateTotalPriceAndQuantity(quantity + raddayquantity)
  }, [raddayquantity])
  useEffect(() => {
    if (Object.keys(landInfo).length != 0) {
      if (props.rcc && firstRcc == 0) {
        firstRcc = 1;
      }
      if (landInfo[props.landsize]["RCC"] && props.item in landInfo[props.landsize]["RCC"] && firstRcc) {
        if (props.rcc == "t") {
          updateTotalPriceAndQuantity(quantity + Number(landInfo[props.landsize]["RCC"][props.item]))
        }
        else if (quantity != 0) {
          updateTotalPriceAndQuantity(quantity - Number(landInfo[props.landsize]["RCC"][props.item]))
        }
      }
    }
  }, [props.rcc]);
  useEffect(() => {
    if (Object.keys(landInfo).length != 0) {
      if (props.plinth && firstPlinth == 0) {
        console.log('0')
        firstPlinth = 1;
      }
      if (landInfo[props.landsize]["PlinthADD"] && props.item in landInfo[props.landsize]["PlinthADD"] && firstPlinth) {
        if (props.plinth == "t") {
          console.log('1')
          updateTotalPriceAndQuantity(quantity + Number(landInfo[props.landsize]["PlinthADD"][props.item]))
        }
        else if (quantity != 0) {
          console.log('2')
          updateTotalPriceAndQuantity(quantity - Number(landInfo[props.landsize]["PlinthADD"][props.item]))
        }
      }
      if (landInfo[props.landsize]["PlinthSUB"] && props.item in landInfo[props.landsize]["PlinthSUB"] && firstPlinth) {
        if (props.plinth == "t") {
          console.log('3')
          updateTotalPriceAndQuantity(quantity - Number(landInfo[props.landsize]["PlinthSUB"][props.item]))
        }
        else if (quantity != 0) {
          console.log('4')
          updateTotalPriceAndQuantity(quantity + Number(landInfo[props.landsize]["PlinthSUB"][props.item]))
        }
      }
      console.log('5')
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
  function updateTotalPriceAndQuantity(newQuantity) {
    props.setCost((draft) => {
      if (category) {
        draft[props.head] -= Number(props.detail[category]?.['price'] * quantity)
        draft[props.head] += Number(props.detail[category]?.['price'] * newQuantity)
      }
    })
    setquantity(newQuantity);

  }
  return (
    <section className='shadow-lg border border-gray-300'>
      <div className={`transition-all !duration-500 collapse collapse-arrow bg-bg rounded-none border-b border-b-gray-400`}>
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
            <p>{props.detail['itemUnit'] || "Quantity"} : </p>
            <p>{quantity}</p>
          </section>
          {props.detail == "null" ? <p>No Category Available</p>
            : <>
              <section className='flex font-bold'>
                <p className='flex-1 py-[1px]'>Category</p>
                <p className='flex-1 py-[1px]'>Name</p>
                <p className='flex-1 py-[1px]'>Price</p>
              </section>
              <div className="divider my-1 before:bg-gray-400 after:bg-gray-400"></div>
              {Object.keys(props.detail).map((el, i) => {
                if (el != 'recomended' && el != 'itemUnit') {
                  return (
                    <button key={i} onClick={() => handleCategoryChange(el)}
                      className={`p-0 w-full ${el == category && 'text-themeFont font-bold'} md:hover:bg-bg-card`}>
                      <section className={`${el == category && 'bg-bg-card'}`}>
                        <section className='flex text-start'>
                          <p className='flex-1 py-[1px]'>{el}</p>
                          <p className='flex-1 py-[1px]'>{props.detail[el]['name']}</p>
                          <p className='flex-1 py-[1px]'>{props.formatNumberWithCommas(props.detail[el]?.['price'] || 0)}</p>
                        </section>
                      </section>
                    </button>
                  )
                }
              })}
            </>}
        </div>
      </div>
    </section >
  );
}
