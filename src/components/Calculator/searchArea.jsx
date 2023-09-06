import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';

export default function SearchArea(props = {}) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    setSuggestions(Object.keys(props.areas));
  }, [])

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    const filteredSuggestions = Object.keys(props.areas).filter((item) =>
      item.toLowerCase().includes(newQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    props.setQueryData(suggestion);
  };

  return (
    <section className=''>
      <section className="text-white flex gap-5 justify-center">
        <input
          className='focus:outline-none w-[60%] bg-slate-600 py-2 px-6 rounded-sm'
          onChange={handleInputChange}
          type="text"
          placeholder="Search Area"
        />
      </section>
      <section className="w-11/12 mt-10 mx-auto grid grid-cols-1 gap-5">
        {suggestions.map((suggestion, i) => (
          <section key={i} className="border-2 border-themeFont rounded-lg p-4 bg-bg-light
          flex justify-start items-center font-bold font-themeFont">
            <Link href='#' onClick={() => handleSuggestionClick(suggestion)} >{suggestion}</Link>
            {/* href={"/calculator/" + are} */}
          </section>
        ))}
      </section>
    </section>
  );
};
