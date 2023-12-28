'use client'
import { useState } from 'react';
import ItemCategories from '@components/Admin/ItemsInfo/itemCategories';
import InputItemCategories from '@components/Admin/ItemsInfo/inputItemCategories';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions, fetchItemsHeadings } from '@redux/itemStore';
import { RiDeleteBin5Line } from 'react-icons/ri'

const ItemInfo = (props = {}) => {
  const [show, setShow] = useState(false)
  const { headings } = useSelector(state => state.itemManager)
  const [itemUnit, setItemUnit] = useState('')
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
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      e.stopPropagation();
      dispatch(ItemManagerActions.deleteItem({ 'head': props.head, 'item': props.children }));
      dispatch(fetchItemsHeadings());
    }
  }
  function handleItemUnit() {
    dispatch(ItemManagerActions.editItemUnit({ 'head': props.head, 'item': props.children, 'unit': itemUnit }))
    dispatch(fetchItemsHeadings());
  }

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 shadow-2xl rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={handleShowBtn} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center" onClick={handleShowBtn}>
        <p>{props.children}</p>
        <button className='z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </div>
      {show && <section className='flex flex-col bg-white'>
        <section className="flex mt-5 mx-4 gap-10 items-center">
          <input
            className='focus:outline-none h-[70%] w-[40%] bg-bg-1 py-2 px-3 rounded-md'
            value={itemUnit}
            onChange={(e) => setItemUnit(e.target.value)}
            type="text"
            placeholder="Add Item Measuring Unit"
          />
          <button onClick={handleItemUnit} className='text-white bg-themeFont'>ADD</button>
        </section>
        <section className="flex gap-5 items-center">
          <h3 className="p-4">Unit :</h3>
          <p className="text-2xl">{headings[props.head][props.children]["itemUnit"] || "No Unit"}</p>
        </section>
        <div className="collapse-content flex flex-col gap-3">
          <section className='flex pt-3'>
            <p className='flex-1'>Select</p>
            <p className='flex-1'>Category</p>
            <p className='flex-1'>Name</p>
            <p className='flex-1'>Price-Per-Unit</p>
          </section>
          <div className="divider my-1 before:bg-themeFont after:bg-themeFont"></div>
          {Object.keys(headings[props.head][props.children]).map((el, i) => {
            if ((el != 'recomended' && el != 'itemUnit') && headings[props.head][props.children] != 'null') {
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
                    head={props.head}
                    recommended={recommended}>
                  </ItemCategories>
                </section>)
            }
          })
          }
          <InputItemCategories head={props.head} item={props.children} ></InputItemCategories>
        </div>
      </section>}
    </div>
  );
}

export default ItemInfo;
