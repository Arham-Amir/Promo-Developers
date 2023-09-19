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
    areaChange(newQuery);

  };
  const hadnleLandChange = (e) => {
    setAreaSuggestions([])
    setLandInput(e.target.value);
    setAreaInput('')
    const newQuery = e.target.value;
    landChange(newQuery);
  };
  function areaChange(q) {
    const filteredSuggestions = Object.keys(props.areas).filter((item) =>
      item.toLowerCase().includes(q.toLowerCase())
    );
    setAreaSuggestions(filteredSuggestions);
  }
  function landChange(q) {
    let arr = []
    Object.keys(props.areas).map((area) => {
      props.areas[area] != "null" && arr.push(...Object.keys(props.areas[area]))
    })
    arr = [...new Set(arr)]
    const filteredSuggestions = arr.filter((item) =>
      item.toLowerCase().includes(q.toLowerCase())
    );
    setLandSuggestions(filteredSuggestions);
  }
  function hadnleAreaClick() {
    if (landSuggestions != []) {
      setLandSuggestions([])
    }
    areaChange('')
  }
  function hadnleLandClick() {
    if (areaSuggestions != []) {
      setAreaSuggestions([])
    }
    landChange('')
  }
  const handleAreaSuggestionClick = (suggestion) => {
    setAreaSuggestions([])
    props.setLand('');
    props.setArea(suggestion);
  };
  const handleLandSuggestionClick = (suggestion) => {
    setLandSuggestions([])
    props.setArea('');
    props.setLand(suggestion);
  };

  return (
    <section className=''>
      <section className="text-black flex gap-3 justify-center bg-black/50 p-5">
        <section className='w-[40%] relative'>
          <input
            className='focus:outline-none w-full bg-bg py-5 px-6 '
            onChange={hadnleAreaChange}
            onClick={hadnleAreaClick}
            type="text"
            value={areaInput}
            placeholder="Search Area"
          />
          {areaSuggestions.length > 0 && (
            <section className='absolute top-full bg-gray-200/90 w-full flex flex-col items-start gap-3 p-5 max-h-[37vh] custom-scrollbar'>
              {areaSuggestions.map((suggestion) => (
                <button className='w-full text-start border-b border-gray-400'
                  key={suggestion}
                  onClick={() => handleAreaSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </section>
          )}
        </section>
        <section className='w-fit relative '>
          <input
            className='focus:outline-none w-full bg-bg py-5 px-6 '
            onChange={hadnleLandChange}
            onClick={hadnleLandClick}
            type="text"
            value={landInput}
            placeholder="Search Land"
          />
          {landSuggestions.length > 0 && (
            <section className='absolute top-full bg-gray-200/90 w-full flex flex-col items-start gap-3 p-5 max-h-[37vh] custom-scrollbar'>
              {landSuggestions.map((suggestion) => (
                <button className='w-full text-start border-b border-gray-400'
                  key={suggestion}
                  onClick={() => handleLandSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </section>
          )}
        </section>
      </section>
    </section>
  );
};
