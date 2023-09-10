import VideoComp from '@components/Home/videoComp'
import Services from '@components/Home/services'
import ContactUs from '@components/Home/contactUs';
import SideBySide from '@components/Home/sideBySide';
import Intro from '@components/Home/intro';
import Fotter from '@components/Base/fotter';

const HomeComponent = () => {
  return (
    <section>
      <VideoComp />
      {/* <ProjectsInfo /> */}
      <SideBySide />
      <Intro />
      <Services />
      {/* <AboutUs /> */}
      <ContactUs />
      <Fotter />
    </section>
  );
}

export default HomeComponent;
