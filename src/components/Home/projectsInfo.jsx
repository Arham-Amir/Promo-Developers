import ProjectInfoLeft from "@components/Home/projectInfoLeft";
import ProjectInfoRight from "@components/Home/projectInfoRight";
const ProjectsInfo = () => {
  return (
    <section className="bg-[url('/image/bg.png')] md:min-h-screen xs:h-auto xs:py-10 md:py-0 flex md:flex-row px-10">
      <ProjectInfoLeft className='md:w-[25%] md:flex justify-end xs:hidden ' />
      <ProjectInfoRight className='md:w-[75%] flex sm:flex-row xs:flex-col-reverse xs:gap-8 sm:gap-0' />
    </section>
  );
}

export default ProjectsInfo;
