import Link from 'next/link';
import { useState } from 'react';

export default function SearchArea(props = {}) {
  const [areaSuggestions, setAreaSuggestions] = useState([]);
  const [landSuggestions, setLandSuggestions] = useState([]);
  const [areaInput, setAreaInput] = useState('');
  const [landInput, setLandInput] = useState('');

  const hadnleAreaChange = (e) => {
    setLandSuggestions([])
    setAreaInput(e.target.value);
    setLandInput('')
    const newQuery = e.target.value;

    const filteredSuggestions = Object.keys(props.areas).filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setAreaSuggestions(filteredSuggestions);
  };
  const hadnleLandChange = (e) => {
    setAreaSuggestions([])
    setLandInput(e.target.value);
    setAreaInput('')
    const newQuery = e.target.value;

    let arr = []
    Object.keys(props.areas).map((area)=>{
      props.areas[area] != "null" && arr.push(...Object.keys(props.areas[area]))
    })
    arr = [...new Set(arr)]
    const filteredSuggestions = arr.filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setLandSuggestions(filteredSuggestions);
  };

  const handleAreaSuggestionClick = (suggestion) => {
    props.setLand('');
    props.setArea(suggestion);
  };
  const handleLandSuggestionClick = (suggestion) => {
    props.setArea('');
    props.setLand(suggestion);
  };

  return (
    <section className=''>
      <section className="text-white flex gap-5 justify-center">
        <input
          className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-sm'
          onChange={hadnleAreaChange}
          type="text"
          value={areaInput}
          placeholder="Search Area"
        />
        <input
          className='focus:outline-none w-[40%] bg-slate-600 py-2 px-6 rounded-sm'
          onChange={hadnleLandChange}
          type="text"
          value={landInput}
          placeholder="Search Land"
        />
      </section>
      <section className="w-11/12 mt-10 mx-auto grid grid-cols-1 gap-5">
        {areaSuggestions?.map((suggestion, i) => (
          <section key={i} className="border-2 border-themeFont rounded-lg p-4 bg-bg-light
          flex justify-start items-center font-bold font-themeFont">
            <Link href='#' onClick={() => handleAreaSuggestionClick(suggestion)} >{suggestion}</Link>
          </section>
        ))}
        {landSuggestions?.map((suggestion, i) => (
          <section key={i} className="border-2 border-themeFont rounded-lg p-4 bg-bg-light
          flex justify-start items-center font-bold font-themeFont">
            <Link href='#' onClick={() => handleLandSuggestionClick(suggestion)} >{suggestion}</Link>
          </section>
        ))}
      </section>
    </section>
  );
};
