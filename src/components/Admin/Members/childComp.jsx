'use client'

import React, { useEffect } from 'react';
import AddMember from './addMember/addMember';
import { useDispatch, useSelector } from 'react-redux';
import { ItemManagerActions, fetchMembers } from '@redux/itemStore';
import { RiDeleteBin5Line } from 'react-icons/ri';
import LazyImage from '@components/Base/lazyImage';

const ChildComp = () => {
  const { members, membersloading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  function handledeletebutton(el) {
    const confirm = window.confirm("are you sureyou want to delete")
    if (confirm) {
      dispatch(ItemManagerActions.deleteMember({ "member": el }))
      dispatch(fetchMembers())
    }
  }

  useEffect(() => {
    dispatch(fetchMembers())
  }, []);
  return (
    <section className='flex flex-col gap-5 p-4'>
      <AddMember />
      <hr className='' />
      {membersloading ? <span className="loading loading-dots loading-lg text-themeFont" />
        :
        <section className="flex flex-row flex-wrap gap-8 justify-center items-center">
          {members && Object.keys(members).map((el, index) => (
            <section key={index} className='flex flex-col items-center justify-between gap-2 basis-1/3 md:basis-1/4 xl:basis-1/5 relative'>
              <LazyImage
                src={members[el][0]}
                alt={`Existing Image ${index + 1}`}
                className='w-full h-44 m-auto object-fill'
              />
              <p className='font-heading font-bold'>{el}</p>
              <button className='z-20 absolute top-3 right-3 bg-white' onClick={() => handledeletebutton(el)}><RiDeleteBin5Line /></button>
            </section>
          ))}
        </section>
      }
    </section>
  );
}

export default ChildComp;
