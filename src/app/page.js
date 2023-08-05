import LeftBox from "@components/Home/leftBox"
import RightBox from "@components/Home/rightBox"
import CenterBox from "@components/Home/centerBox"
export default function Home() {

  return (
    <main className='flex mt-7 text-white'>
      <LeftBox class="basis-1/7  min-h-[70vh]"></LeftBox>
      <CenterBox class="basis-4/7 min-h-[2000px]"></CenterBox>
      <RightBox class="w-[25%] min-h-[70vh]"></RightBox>
    </main>
  )
}
