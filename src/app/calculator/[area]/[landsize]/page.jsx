import { get, child, ref } from 'firebase/database'
import { db } from '@api/dbConfig'
import Constructed from "@components/Calculator/constructed";
export async function generateStaticParams() {
  let areas = await get(child(ref(db), 'Development/Areas'))
  areas = await areas.val();
  return (Object.keys(areas)
    .flatMap((area) => {
      return areas[area] !== "null"
        ? Object.keys(areas[area]).map((land) => {
          return {
            'area': area,
            'landsize': land
          };
        })
        : null;
    })
    .filter((el) => el !== null)
  )
}

const Page = ({ params }) => {
  const url = params.landsize.split("%20").join(" ")
  const url1 = params.area.split("%20").join(" ")
  return (
    <section className="relative">
      <Constructed landsize={url} area={url1}></Constructed>
    </section>
  );
}

export default Page;
