import Image from "next/image";

const ProjectInfoLeft = (props = {}) => {
  return (
    <section className={`${props.className}`}>
      <section className="w-[290px] h-3/4 mt-12">
        <Image src="/image/project2.jpg" alt="house pic 1" width={0} height={0}
          className="h-full w-auto object-cover border" />
      </section>
    </section>
  );
}

export default ProjectInfoLeft;
