'use client'
import { useEffect, useState } from 'react';

export default function CenterBoxItems(props = {}) {
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (props.choice === 'Recomended') {
      updatePrice(props.detail['recomended'])
      setCategory(props.detail['recomended']);
    }
  }, [props.choice])
  function updatePrice(cat) {
    props.setCost((draft) => {
      if (category) {
        console.log(props.detail[cat]['price'])
        draft[props.head] -= Number(props.detail[category]['price'])
        draft[props.head] += Number(props.detail[cat]['price'])
      }
      else if(cat) {
        if (draft[props.head]) {
          draft[props.head] += Number(props.detail[cat]['price'])
        }
        else {
          draft[props.head] = Number(props.detail[cat]['price'])
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
    <section className='shadow-2xl'>
      <div className={`collapse collapse-arrow bg-bg-dark rounded-none border-b
       border-b-bg-dark`}>
        <input type="radio"
          name={`my-accordion-${props.index}`}
          checked={isOpen}
          onChange={() => { }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className="collapse-title text-2xl font-bold bg-bg-light">
          {props.item}
        </div>
        <div className="collapse-content bg-bg-dark ">
          <section className='flex font-bold pt-3'>
            <h3 className='flex-1'>Select</h3>
            <h3 className='flex-1'>Category</h3>
            <h3 className='flex-1'>Name</h3>
          </section>
          <div className="divider my-1 before:bg-themeFont after:bg-themeFont"></div>
          {Object.keys(props.detail).map((el, i) => {
            if (el != 'recomended') {
              return (
                <section key={i}>
                  <section className='flex items-center'>
                    <h3 className='flex-1 py-[1px]'><input type="radio" value={el}
                      name={`radio-${props.index + 1}`} className="radio radio-warning w-4 h-4"
                      checked={category === el} onChange={() => handleCategoryChange(el)} /></h3>
                    <h3 className='flex-1 py-[1px]'>{el}</h3>
                    <h3 className='flex-1 py-[1px]'>{props.detail[el]['name']}</h3>
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
