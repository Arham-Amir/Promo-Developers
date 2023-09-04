import { get, child, ref } from 'firebase/database'
import { db } from '@api/dbConfig'
import Constructed from "@components/Calculator/constructed";
export async function generateStaticParams() {
  let posts = await get(child(ref(db), 'Development/LandSize'))
  posts = await posts.val();
  return (Object.keys(posts).map((post) => ({
     'landsize' : post.split(" ").join("")
  })))
}

const Page = ({ params }) => {
  return (
    <section className="relative">
      <Constructed landsize={params.landsize}></Constructed>
    </section>
  );
}

export default Page;
