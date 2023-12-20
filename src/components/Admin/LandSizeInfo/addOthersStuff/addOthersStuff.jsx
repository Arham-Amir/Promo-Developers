'use client'

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ItemManagerActions, fetchLandExtraInfo } from "@redux/itemStore";

const AddOthersStuff = ({ land, place }) => {
  const { headingloading, headings, RCC, PlinthADD, PlinthSUB, Radday, LandOtherLoading } = useSelector((state) => state.itemManager)
  const dispatch = useDispatch();
  const [items, setitems] = useState([]);
  const [selected, setselected] = useState({});
  const [current, setcurrent] = useState("");

  useEffect(() => {
    if (headingloading == false) {
      let it = []
      Object.keys(headings).map((el) => {
        it = it.concat(Object.keys(headings[el]))
      })
      setitems(it)
    }
  }, []);
  useEffect(() => {
    if (LandOtherLoading == false) {
      let updatedInputValues = {}
      if (place == "RCC") {
        for (const key in RCC) {
          updatedInputValues = { ...updatedInputValues, [key]: RCC[key] };
        }
      }
      else if (place == "PlinthADD") {
        for (const key in PlinthADD) {
          updatedInputValues = { ...updatedInputValues, [key]: PlinthADD[key] };
        }
      }
      else if (place == "PlinthSUB") {
        for (const key in PlinthSUB) {
          updatedInputValues = { ...updatedInputValues, [key]: PlinthSUB[key] };
        }
      }
      else if (place == "Radday") {
        for (const key in Radday) {
          updatedInputValues = { ...updatedInputValues, [key]: Radday[key] };
        }
      }

      setselected(updatedInputValues);
    }
  }, [LandOtherLoading]);

  function handleAddRCCButton() {
    if (current != "select" && current != "" && current in selected == false) {
      setselected({ ...selected, [current]: 0 })
    }
  }
  function handleInputChange(el, value) {
    const updatedInputValues = { ...selected, [el]: value };
    setselected(updatedInputValues);
  }
  function handleSaveRccButton() {
    const confirmed = window.confirm("Are you sure you want to save?");
    if (confirmed) {
      dispatch(ItemManagerActions.addLandExtraInfo({ land, place, value: selected }))
      dispatch(fetchLandExtraInfo(land))
    }

  }
  function handleDeleteRow(el) {
    const { [el]: deletedRow, ...updatedInputValues } = selected;
    setselected(updatedInputValues);
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="w-full text-center p-2 border border-slate-400">{place}</h2>
      <section className="flex flex-col gap-3">
        {headingloading ? <p>Loading</p>
          :
          <section className="flex gap-4">
            <select value={current} onChange={(e) => setcurrent(e.target.value)} name="item" id="item" className="border text-lg bg-bg">
              <option value="select">Select</option>
              {items.map((el, i) => (el != "order" && <option key={i} value={el}>{el}</option>))}
            </select>
            <button onClick={handleAddRCCButton} className="bg-themeFont text-white">Add</button>
          </section>
        }
        {LandOtherLoading ? <span className="loading loading-dots loading-lg text-themeFont" />
          : selected &&
          <section className="flex flex-col gap-4">
            {Object.keys(selected).map((el, i) => (
              <section key={i} className="flex items-center gap-5 bg-bg p-2">
                <p>{el}</p>
                <input value={selected[el]} onChange={(e) => handleInputChange(el, e.target.value)} type="number" className="p-1 border" />
                <button onClick={() => handleDeleteRow(el)} className="bg-red-500 text-white">Delete</button>
              </section>
            ))}
          </section>
        }

        <button onClick={handleSaveRccButton} className="bg-gray-300">Save</button>
      </section>
    </section>
  );
}

export default AddOthersStuff;
