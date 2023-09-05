import Step1 from "@components/Calculator/step1";
import { get, child, ref } from 'firebase/database'
import { db } from '@api/dbConfig'
import { Suspense } from "react";

export async function generateStaticParams() {
  let areas = await get(child(ref(db), 'Development/Areas'))
  areas = await areas.val();
  let arr = []
  arr.push(...Object.keys(areas).map((area) => ({
    'area': area
  })))
  console.log(arr)
  return arr;
}
const Page = ({ params }) => {
  return (
    <section className="h-[88vh] w-full flex">
      <section className="bg-[url('/image/calcBg.png')] w-1/2"></section>
      <Suspense fallback={<span className="loading loading-dots loading-lg text-themeFont" />}>
        <Step1 area={params.area} className="w-1/2 bg-bg-light" />
      </Suspense>
    </section>
  );
}

export default Page;
