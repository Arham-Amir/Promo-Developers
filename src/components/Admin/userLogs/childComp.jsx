'use client'

import { ItemManagerActions, getUserLogs } from '@redux/itemStore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { toast } from 'react-toastify';

const ChildComp = () => {
  const { logsloading, userLogs } = useSelector(state => state.itemManager)
  const [cloading, setcloading] = useState(true);
  const [filter, setfilter] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserLogs())
  }, []);
  useEffect(() => {
    if (userLogs != {}) {
      filterNewest()
      setcloading(false)
    }
  }, [userLogs]);

  function filterNewest() {
    const keysArray = Object.keys(userLogs);
    const sortedKeys = keysArray.sort((a, b) => {
      return new Date(userLogs[b]["UserDate"]) - new Date(userLogs[a]["UserDate"]);
    });
    setfilter(sortedKeys)
  }
  function filterLand() {
    const dataArray = Object.entries(userLogs);
    const sortedArray = dataArray.sort(([aKey, aValue], [bKey, bValue]) => {
      const aLand = aValue.Land;
      const bLand = bValue.Land;

      if (aLand < bLand) return -1;
      if (aLand > bLand) return 1;
      return aKey.localeCompare(bKey);
    });
    const sortedKeys = sortedArray.map(([key]) => key);
    setfilter(sortedKeys)
  }

  function handleChangeOption(e) {
    setcloading(true)
    const val = e.target.value;
    if (val == "Newest") {
      filterNewest()
    }
    else if (val == "Land") {
      filterLand()
    }
    setcloading(false)
  }
  function handleDelete7DaysOlder() {
    const currentDate = new Date();
    const dataArray = Object.entries(userLogs);

    const filteredArray = dataArray.filter(([key, value]) => {
      const userDate = new Date(value.UserDate);
      const differenceInDays = (currentDate - userDate) / (1000 * 60 * 60 * 24);

      return differenceInDays <= 7;
    });

    const sortedAndFilteredKeys = filteredArray.map(([key]) => key);
    if (sortedAndFilteredKeys.length == Object.keys(userLogs).length) {
      toast.warning("Logs Already Contained Last 7 Days Data.")
    }
    else {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
        let temp = {}
        sortedAndFilteredKeys.map((el) => {
          temp[el] = userLogs[el]
        })
        dispatch(ItemManagerActions.deleteOldLogs({ 'value': temp }));
        dispatch(getUserLogs());
      }
    }
  }
  return (
    <section className='w-11/12 py-5 mx-auto flex-all-center'>
      {logsloading || cloading ? <span className="loading loading-dots loading-lg text-themborder-themeFont" />
        :
        <section className='w-full flex flex-col gap-5'>
          <section className='flex justify-between w-full'>
            <button onClick={() => handleDelete7DaysOlder()} className='bg-themeFont text-white'>Delete 7 Days Older Logs</button>
            <select onChange={(e) => handleChangeOption(e)} className='text-themeFont bg-bg-1 rounded-md p-1 min-w-max'>
              <option value="Newest">Sort: Newest</option>
              <option value="Land">Sort: LandSize</option>
            </select>
          </section>

          <table className='w-full border-t border-l border-themeFont'>
            <thead className='w-full'>
              <tr className='w-full flex border-b border-themeFont bg-bg-1'>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Id</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>UserName</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Number</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Email</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Date</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Land</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Area</th>
                <th className='py-2 !w-1/8 text-ceneter border-r border-themeFont'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filter && filter.map((el, i) => {
                return <Record setcloading={setcloading} key={i} el={el} i={i} />
              })}
            </tbody>
          </table>
        </section>
      }
    </section>
  );
}

export default ChildComp;

function Record({ el, i, setcloading }) {
  const { userLogs } = useSelector(state => state.itemManager)
  const [checkLog, setcheckLog] = useState(userLogs[el]["status"] || false);
  const dispatch = useDispatch()

  function handlecheckbutton(el) {
    const confirmed = window.confirm("Are you sure you want to update check?");
    if (confirmed) {
      dispatch(ItemManagerActions.setLogCheck({ 'user': el, 'value': !checkLog }));
      dispatch(getUserLogs());
      setcheckLog((prev) => !prev)
    }
  }
  function handledeletebutton(el) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setcloading(true)
      dispatch(ItemManagerActions.deleteLog({ 'user': el }));
      dispatch(getUserLogs());
    }
  }
  return <tr className={`${i % 2 != 0 && 'bg-bg'} flex border-b border-themeFont`}>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{i + 1}.</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["UserName"]}</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["UserNumber"]}</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["UserEmail"]}</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["UserDate"]}</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["Land"]}</td>
    <td className='!w-1/8 break-words text-start border-r border-themeFont'>{userLogs[el]["Area"]}</td>
    <td className='!w-1/8 text-ceneter border-r border-themeFont flex-all-center'>
      <input checked={checkLog}
        onChange={() => handlecheckbutton(el)}
        type="checkbox" name="checkLog" id="checkLog" />
      <button className='z-20' onClick={() => handledeletebutton(el)}><RiDeleteBin5Line /></button>
    </td>
  </tr>
}
