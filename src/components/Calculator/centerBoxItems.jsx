'use client'
import { useEffect, useState } from 'react';

export default function CenterBoxItems(props = {}) {
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const quantity = props.areas[props.area][props.landsize][props.item];
  useEffect(() => {
    if (props.choice === 'Recomended') {
      updatePrice(props.detail['recomended'])
      setCategory(props.detail['recomended']);
    }
  }, [props.choice])
  useEffect(() => {
    props.setSelectedItems((draft) => {
      draft[props.item] = props.detail[category]?.['price'] * props.areas[props.area][props.landsize][props.item]
    })
  }, [category])
  function updatePrice(cat) {
    props.setCost((draft) => {
      if (category) {
        draft[props.head] -= Number(props.detail[category]['price']*quantity)
        draft[props.head] += Number(props.detail[cat]['price']*quantity)
      }
      else if (cat) {
        if (draft[props.head]) {
          draft[props.head] += Number(props.detail[cat]['price']*quantity)
        }
        else {
          draft[props.head] = Number(props.detail[cat]['price']*quantity)
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
      <div className={`collapse collapse-arrow bg-bg rounded-none border-b border-b-gray-400`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      >
        <input type="radio"
          name={`my-accordion-${props.index}`}
          checked={isOpen}
          onChange={() => { }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="collapse-title flex items-center justify-between text-lg font-bold bg-bg-card">
          <p>{props.item}</p>
          <p className='text-sm'>{props.formatNumberWithCommas(props.detail[category]?.['price'] * quantity)}</p>
        </div>
        <div className="collapse-content bg-bg-card/20 flex flex-col gap-2">
          <section className='flex gap-10 font-bold border-y-2 py-2 border-dashed border-gray-400 my-3'>
            <h1>Quantity : </h1>
            <p>{props.areas[props.area][props.landsize][props.item]}</p>
          </section>
          <section className='flex font-bold'>
            <h3 className='flex-1'>Category</h3>
            <h3 className='flex-1'>Name</h3>
            <h3 className='flex-1'>Price</h3>
          </section>
          <div className="divider my-1 before:bg-gray-400 after:bg-gray-400"></div>
          {Object.keys(props.detail).map((el, i) => {
            if (el != 'recomended') {
              return (
                <section key={i} className={`${el == category && 'bg-bg-card'}`}>
                  <section className='flex items-center'>
                    <button onClick={() => handleCategoryChange(el)}
                      className={`text-start flex-1 py-[1px] ${el == category && 'text-themeFont font-bold'}`}>{el}</button>
                    <h3 className='flex-1 py-[1px]'>{props.detail[el]['name']}</h3>
                    <h3 className='flex-1 py-[1px]'>{props.formatNumberWithCommas(props.detail[el]['price'])}</h3>
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
