'use client'
import { useEffect, useState } from 'react';
import { db } from '@api/dbConfig';
import { get, ref, child, set } from 'firebase/database';

const Page = () => {
  const [obj, setObj] = useState(null);
  const [areas, setareas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot1 = await get(child(ref(db), 'Development/Areas/'));
        setareas(await snapshot1.val());
        const snapshot = await get(child(ref(db), 'Development/LandSize/'));
        setObj(await snapshot.val());

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(areas){
    Object.keys(areas).map((el)=>{
      set(child(ref(db), 'Development/Areas/' + el), obj);
    })}
  }, [obj]);

  return (
    <div>
      {/* Render content using obj */}
    </div>
  );
}

export default Page;
