'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CenterBoxItems(props = {}) {
  const { selectedLand } = useSelector(state => state.itemManager)
  const [value, setValue] = useState(props.detail['recomended'] || '');

  useEffect(() => {
    if (props.choice === 'Recomended') {
      setValue(props.detail['recomended']);
    }
  }, [props.choice])
  const handleChange = (event) => {
    if (props.choice === 'Recomended') {
      props.setChoice('Custom');
    }
    setValue(event.target.value);
    console.log(event.target.value)
  };
  return (
    <section className='mb-3 shadow-2xl'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.item}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <hr className='text-black' />
          <FormControl className='pt-2'>
            <FormLabel id="demo-radio-buttons-group-label">Categories</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={value}
              // checked = {props.detail['recomended']}
              onChange={handleChange}
            >
              {Object.keys(props.detail).map((el, i) => {
                if (el != 'recomended') {
                  return (
                    <Typography key={i}>
                      <FormControlLabel value={el} control={<Radio />} label={`${el} - ${props.detail[el]['name']} - ${props.detail[el]['price'] * selectedLand[props.item]} Rs`} />
                    </Typography>
                  )
                }
              })}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
