'use client'
import { Provider as Prov } from "react-redux"
import store from "@redux/store";
import ContactUs from '@components/Base/ContactUs/contactUs';
import Fotter from '@components/Base/fotter';
import { usePathname } from "next/navigation";

const Provider = ({ children }) => {
  const path = usePathname();
  return (
    <Prov store={store}>
      {children}
      {!path.includes("/admin")
        && <>
          <ContactUs />
          <Fotter />
        </>}
    </Prov>
  );
}

export default Provider;


