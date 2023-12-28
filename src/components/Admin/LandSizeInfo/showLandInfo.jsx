'use client'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddOthersStuff from "./addOthersStuff/addOthersStuff.jsx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ItemManagerActions, fetchLandInfo } from "@redux/itemStore.jsx";


const ShowLandInfo = ({ land, index }) => {
  const { landloading } = useSelector((state) => state.itemManager);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  const handleRadioChange = () => {
    setShow(!show);
  };
  function handledeletebutton(e) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      e.stopPropagation();
      dispatch(ItemManagerActions.deleteCommonLand({ 'land': land }));
      dispatch(fetchLandInfo());
    }
  }
  return (
    <div
      className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none text-themeFont ${show ? "collapse-open" : ""
        }`}
    >
      <input
        className="max-w-full"
        type="radio"
        name={`my-accordion-${index}`}
        checked={show}
        onChange={() => { }}
        onClick={handleRadioChange}
      />
      <div
        className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center"
        onClick={handleRadioChange}
      >
        <p>{land}</p>
        <button className='z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </div>
      {show && (landloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        :
        <div className="collapse-content bg-white flex flex-col gap-5 pt-5">
          <AddOthersStuff land={land} place="RCC" />
          <AddOthersStuff land={land} place="PlinthADD" />
          <AddOthersStuff land={land} place="PlinthSUB" />
          <AddOthersStuff land={land} place="Radday" />
        </div>
      )}
    </div>
  );
};

export default ShowLandInfo;
