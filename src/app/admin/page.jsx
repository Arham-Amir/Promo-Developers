'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { shiftItems } from '@redux/itemStore'
import { useDispatch } from 'react-redux';

const Page = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(shiftItems(
  //     {
  //       'item': 'Wiring',
  //       'head': 'Electrical Work'
  //     }))
  // }, []);
  return (
    <div className='flex-all-center min-h-screen'>
      <Link href='/admin/items' className='bg-themeFont py-4 px-6 text-white text-xl'>Login</Link>
    </div>
  );
}

export default Page;
