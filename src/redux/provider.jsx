'use client'
import { Provider as Prov } from "react-redux"
import store from "@redux/store";
import ContactUs from '@components/Base/ContactUs/contactUs';
import Fotter from '@components/Base/fotter';
import { usePathname } from "next/navigation";
import UpComingEvent from '@components/Base/upComingEvent'
import ContactPopUpBtn from '@components/Base/contactPopUpBtn'
import ShowEvent from '@components/Base/showEvent'

const Provider = ({ children }) => {
  const path = usePathname();
  return (
    <Prov store={store}>
      {children}
      {!path.includes("/admin")
        && <>
          <ShowEvent />
          <ContactPopUpBtn />
          <UpComingEvent />
          <ContactUs />
          <Fotter />
        </>}
    </Prov>
  );
}

export default Provider;


