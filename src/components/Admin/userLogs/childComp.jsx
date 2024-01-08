'use client'

import { ItemManagerActions, getUserLogs } from '@redux/itemStore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from 'react-icons/ri'

const ChildComp = () => {
  const { logsloading, userLogs } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserLogs())
  }, []);

  return (
    <section className='w-11/12 py-5 mx-auto flex-all-center'>
      {logsloading ? <span className="loading loading-dots loading-lg text-themborder-themeFont" />
        :
        <section className='w-full flex flex-col gap-5'>
          <section className='flex justify-between w-full text-white'>
            <button className='bg-themeFont'>Delete 7 Days Older Logs</button>
            <button className='bg-themeFont'>Delete 7 Days Older Logs</button>
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
              {Object.keys(userLogs).map((el, i) => {
                return <Record key={i} el={el} i={i} />
              })}
            </tbody>
          </table>
        </section>
      }
    </section>
  );
}

export default ChildComp;

function Record({ el, i }) {
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
