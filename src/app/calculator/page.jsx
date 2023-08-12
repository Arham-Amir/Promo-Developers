import LeftBox from "@components/Calculator/leftBox"
import RightBox from "@components/Calculator/rightBox"
import CenterBox from "@components/Calculator/centerBox"

const Page = () => {
  return (
    <section className='flex mt-7 text-white'>
      <LeftBox class="basis-1/7  min-h-[70vh]"></LeftBox>
      <CenterBox class="basis-4/7 "></CenterBox>
      <RightBox class="w-[25%] min-h-[70vh]"></RightBox>
    </section>
  );
}

export default Page;
