'use client'
import { useEffect, useState } from 'react';
import ItemCategories from '@components/Admin/ItemsInfo/itemCategories';
import InputItemCategories from '@components/Admin/ItemsInfo/inputItemCategories';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions } from '@redux/itemStore';

const ItemInfo = (props = {}) => {
  const [show, setShow] = useState(false)
  const { loading, categories } = useSelector(state => state.itemManager)
  const recommendedCategory = categories[props.children]?.recomended || '';
  const [recommended, setRecommended] = useState(recommendedCategory);
  const dispatch = useDispatch()
  const handleChange = (item, el) => {
    setRecommended(el);
    dispatch(ItemManagerActions.setRecomendedItemCategory({'head':props.head, 'item': item, 'category': el }))
  };

  function handleShowBtn() {
    setShow(!show)
  }

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''} mt-10`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleShowBtn} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-light" onClick={handleShowBtn}>
        {props.children}
      </div>
      {show && <>
        <div className="collapse-content bg-bg-dark flex flex-col gap-3">
          <section className='flex font-bold pt-3'>
            <h3 className='flex-1'>Select</h3>
            <h3 className='flex-1'>Category</h3>
            <h3 className='flex-1'>Name</h3>
            <h3 className='flex-1'>Price-Per-Unit</h3>
          </section>
          <div className="divider my-1 before:bg-themeFont after:bg-themeFont"></div>
          {Object.keys(categories[props.head][props.children]).map((el, i) => {
            console.log(el, categories[props.head][props.children])
            if (el != 'recomended' && categories[props.head][props.children] != 'null') {
              return (
                <section key={i} className='flex items-center'>
                  <section className='flex-1'>
                    <label className='' >
                      <input className=''
                        type="radio"
                        value={el}
                        checked={recommended === el}
                        onChange={() => handleChange(props.children, el)}
                      />
                    </label>
                  </section>
                  <ItemCategories
                    item={props.children} category={el} name={categories[props.head][props.children][el]['name']}
                    pricePU={categories[props.head][props.children][el]['price']}
                    setRecommended={setRecommended}
                    recommended={recommended}>
                  </ItemCategories>
                </section>)
            }
          })
          }
          <InputItemCategories head = {props.head} item={props.children} ></InputItemCategories>
        </div>
      </>}
    </div>
  );
}

export default ItemInfo;
