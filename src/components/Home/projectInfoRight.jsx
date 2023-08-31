import Image from "next/image";
import { AiOutlineLine } from 'react-icons/ai'

const ProjectInfoRight = (props) => {
  return (
    <section className={`${props.className}`}>
      <section className="xs:w-11/12 sm:w-1/3 md:w-1/4 md:h-3/4 sm:h-auto md:mt-12 xs:mx-auto sm:ml-7">
        <Image src="/image/house2.jpg" alt="house pic 1" width={0} height={0}
          className="h-full w-auto object-cover md:mt-14" />
      </section>
      <section className="sm:w-2/3 md:w-3/4 h-3/4 flex md:mt-12">
        <section className="sm:w-[96%] md:w-3/4 h-full md:mt-14 md:pt-2 sm:pl-10 xs:pl-3 text-bg-dark">
          <p className="flex items-center gap-2 text-sm"><AiOutlineLine size={30}/> What we offer</p>
          <section className="pl-9 flex flex-col gap-3">
            <h1 className="text-3xl font-bold lg:w-3/4">Creating Wonderful Living Spaces</h1>
            <p className="2xl:text-lg lg:w-4/5">Lorem ipsum dolor sit adipisicing elit. Perferendis mollitia, est vel fuga explicabo quod eos qui ut consectetur soluta.</p>
            <p className="2xl:text-lg w-11/12">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia vero reprehenderit et aliquid maxime quasi debitis. Libero hic fugiat magni omnis eum dolores excepturi aliquid </p>
          </section>
        </section>
      </section>
    </section>
  );
}

export default ProjectInfoRight;
