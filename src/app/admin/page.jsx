import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className='flex-all-center min-h-screen'>
      <Link href='/dashboard' className='bg-blue-700 py-4 px-6 rounded-full text-white text-xl'>Login</Link>
    </div>
  );
}

export default Page;
