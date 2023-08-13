import VideoComp from '@components/Home/videoComp'
import ContactUs from '@components/Home/contactUs';
import AboutUs from '@components/Home/aboutUs';
import Fotter from '@components/Base/fotter';

const HomeComponent = () => {
  return (
    <section>
      <VideoComp />
      <AboutUs />
      <ContactUs />
      <Fotter />
    </section>
  );
}

export default HomeComponent;
