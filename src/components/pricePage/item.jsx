'use client'
import React, { useEffect, useState } from 'react';
import ItemCategories from '@components/pricePage/itemCategories';
import InputItemCategories from '@components/pricePage/inputItemCategories';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@redux/itemStore';



const Item = (props = {}) => {
  const [show, setShow] = useState(false)
  const { loading, categories } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    if (loading == false) {
      dispatch(fetchCategories())
    }
  }, [])
  function handleShowBtn() {
    setShow(!show)
  }

  return (
    <section className='bg-slate-500 text-white p-4 m-4 rounded-3xl border-4 border-black'>
      <button className='hover:text-indigo-800' onClick={handleShowBtn}>
        <h1 className=' p-4 font-bold text-2xl'>{props.children}
          <span className=''> &gt;</span>
        </h1>
      </button>
      {show && <>
        <hr />
        {loading ? <p>Loadingg....</p> :
          categories[props.children] != 'null' &&
          Object.keys(categories[props.children]).map((el, i) => (
            <ItemCategories key={i} item = {props.children} category={el} name={categories[props.children][el]['name']} pricePU={categories[props.children][el]['price']} />
          ))
        }
        <InputItemCategories item={props.children} ></InputItemCategories>
      </>}

    </section>
  );
}

export default Item;
