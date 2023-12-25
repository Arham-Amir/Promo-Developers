'use client'
import { useState } from 'react';
import ItemCategories from '@components/Admin/ItemsInfo/itemCategories';
import InputItemCategories from '@components/Admin/ItemsInfo/inputItemCategories';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions, fetchItemsHeadings } from '@redux/itemStore';
import { RiDeleteBin5Line } from 'react-icons/ri'

const ItemInfo = (props = {}) => {
  const [show, setShow] = useState(false)
  const { loading, headings } = useSelector(state => state.itemManager)
  const [recommended, setRecommended] = useState(props.recomended || 0);
  const dispatch = useDispatch()
  const handleChange = (item, el) => {
    setRecommended(el);
    dispatch(ItemManagerActions.setRecomendedItemCategory({ 'head': props.head, 'item': item, 'category': el }))
    dispatch(fetchItemsHeadings());
  };

  function handleShowBtn() {
    setShow(!show)
  }
  function handledeletebutton(e) {
    e.stopPropagation();
    dispatch(ItemManagerActions.deleteItem({ 'head': props.head, 'item': props.children}));
    dispatch(fetchItemsHeadings());
  }

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleShowBtn} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center" onClick={handleShowBtn}>
        <p>{props.children}</p>
        <button className='z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </div>
      {show && <>
        <div className="collapse-content bg-white flex flex-col gap-3">
          <section className='flex pt-3'>
            <h3 className='flex-1'>Select</h3>
            <h3 className='flex-1'>Category</h3>
            <h3 className='flex-1'>Name</h3>
            <h3 className='flex-1'>Price-Per-Unit</h3>
          </section>
          <div className="divider my-1 before:bg-themeFont after:bg-themeFont"></div>
          {Object.keys(headings[props.head][props.children]).map((el, i) => {
            if (el != 'recomended' && headings[props.head][props.children] != 'null') {
              return (
                <section key={i} className='flex items-center'>
                  <section className='flex-1'>
                    <label className='' >
                      <input className=''
                        type="radio"
                        value={el}
                        checked={recommended == el}
                        onChange={() => handleChange(props.children, el)}
                      />
                    </label>
                  </section>
                  <ItemCategories
                    item={props.children} category={el} name={headings[props.head][props.children][el]['name']}
                    pricePU={headings[props.head][props.children][el]['price']}
                    setRecommended={setRecommended}
                    head = {props.head}
                    recommended={recommended}>
                  </ItemCategories>
                </section>)
            }
          })
          }
          <InputItemCategories head={props.head} item={props.children} ></InputItemCategories>
        </div>
      </>}
    </div>
  );
}

export default ItemInfo;
