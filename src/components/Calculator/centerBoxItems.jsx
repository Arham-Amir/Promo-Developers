'use client'
import { setSelectLand } from '@redux/itemStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CenterBoxItems(props = {}) {
  const { selectedLand } = useSelector(state => state.itemManager)
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (props.choice === 'Recomended') {
      setCategory(props.detail['recomended']);
    }

  }, [props.choice])
  function handleCategoryChange(cat) {
    if (props.choice === 'Recomended') {
      props.setChoice('Custom');
    }
    setCategory(cat);
  };
  return (
    <section className='shadow-2xl'>
      <div className={`collapse collapse-arrow bg-bg-dark rounded-none border-b
       border-b-bg-dark`}>
        <input type="radio"
          name={`my-accordion-${props.index}`}
          checked={isOpen}
          onChange={()=>{}}
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
            <h3 className='flex-1'>Price</h3>
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
                    <h3 className='flex-1 py-[1px]'>{props.detail[el]['price'] * selectedLand[props.item]} Rs</h3>
                  </section>
                </section>

              )
            }
          }
          )}
        </div>
      </div>
    </section>
  );
}
