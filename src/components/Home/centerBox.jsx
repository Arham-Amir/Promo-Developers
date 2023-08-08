'use client'
import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CenterBoxItems from '@components/Home/centerBoxItems';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@redux/itemStore';

const CenterBox = (props = {}) => {
  const [choice, setChoice] = useState('Recomended');
  const { loading, items } = useSelector(state => state.itemManager)

  const handleChoice = (event) => {
    setChoice(event.target.value);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchItems())
  }, [])

  return (
    <section className={`${props.class} flex flex-col`}>
      <section className="flex-grow m-2">
        <section className="bg-white rounded-2xl text-slate-600 py-4 px-4 text-center">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-group-label"
              name="radio-buttons-group"
              value={choice}
              onChange={handleChoice}
              className="flex flex-row gap-10"
            >
              <div>
                <FormControlLabel value="Recomended" control={<Radio />} label="Recommended" />
              </div>
              <div>
                <FormControlLabel value="Custom" control={<Radio />} label="Build Your Dream House" />
              </div>
            </RadioGroup>
          </FormControl>
        </section>
        <section className="text-slate-500 p-4">
          {Object.keys(items).map((el, i) => (
            <CenterBoxItems key={i} item={el} detail={items[el]} choice={choice}
              setChoice={setChoice}></CenterBoxItems>
          ))}
        </section>
      </section>
    </section>
  );
};

export default CenterBox;
