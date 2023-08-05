'use client'
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import CenterBoxItems from '@components/Home/centerBoxItems';

const CenterBox = (props = {}) => {
  const [option, setOption] = useState('female');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <section className={`${props.class} flex flex-col`}>
      <section className="bg-slate-300 flex-grow">
        <section className="bg-white text-slate-600 py-5 px-4 text-center">
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-group-label"
              name="radio-buttons-group"
              value={option}
              onChange={handleChange}
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
          <CenterBoxItems></CenterBoxItems>
        </section>
      </section>
    </section>
  );
};

export default CenterBox;
