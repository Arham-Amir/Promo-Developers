'use client'
import { useEffect, useState } from 'react';
import ItemCategories from '@components/pricePage/itemCategories';
import InputItemCategories from '@components/pricePage/inputItemCategories';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions, fetchCategories } from '@redux/itemStore';




const Item = (props = {}) => {
  const [show, setShow] = useState(false)
  const { loading, categories } = useSelector(state => state.itemManager)
  const recommendedCategory = categories[props.children]?.recomended || '';
  const [recommended, setRecommended] = useState(recommendedCategory);
  const dispatch = useDispatch()

  const handleChange = (item, el) => {
    setRecommended(el);
    dispatch(ItemManagerActions.setRecomendedItemCategory({ 'item': item, 'category': el }))
    console.log(item, el)
  };
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
        <p className='p-4'>Recomended</p>
        {loading ? <p>Loadingg....</p> :
          categories[props.children] != 'null' &&
          Object.keys(categories[props.children]).map((el, i) => {
            if (el != 'recomended') {
              el == categories[props.children]?.recomended && console.log('G')
              return (
                <section key={i}>
                  <label className='flex items-center' >
                    <input
                      className='basis-1/8'
                      type="radio"
                      value={el}
                      checked={recommended === el}
                      onChange={() => handleChange(props.children, el)}
                    />

                    <ItemCategories key={i} className="basis-7/8"
                      item={props.children} category={el} name={categories[props.children][el]['name']}
                      pricePU={categories[props.children][el]['price']}
                      setRecommended={setRecommended}
                      recommended={recommended}>
                    </ItemCategories>
                  </label>
                </section>)
            }
          })
        }
        <InputItemCategories item={props.children} ></InputItemCategories>
      </>}

    </section>
  );
}

export default Item;
