import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function RadioButtonsGroup(props = {}) {
  const [size, setSize] = useState('3 Marla');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Sizes</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={size}
        onChange={handleChange}
      >
         {Object.keys(props.land)?.map((el, i) => (
           <FormControlLabel key={i} value={el} control={<Radio />} label={el} />
         ))}
      </RadioGroup>
    </FormControl>
  );
}
