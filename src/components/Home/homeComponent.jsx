import VideoComp from '@components/Home/videoComp'
import Services from '@components/Home/services'
import SideBySide from '@components/Home/sideBySide';
import Intro from '@components/Home/intro';

const HomeComponent = () => {
  return (
    <section>
      <VideoComp />
      {/* <ProjectsInfo /> */}
      <SideBySide />
      <Intro />
      <Services />
      {/* <AboutUs /> */}
    </section>
  );
}

export default HomeComponent;
