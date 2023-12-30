'use client'
import { Provider as Prov } from "react-redux"
import store from "@redux/store";
import ContactUs from '@components/Base/ContactUs/contactUs';
import Fotter from '@components/Base/fotter';
import { usePathname, useRouter } from "next/navigation";
import UpComingEvent from '@components/Base/upComingEvent'
import ContactPopUpBtn from '@components/Base/contactPopUpBtn'
import ShowEvent from '@components/Base/showEvent'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@api/dbConfig";
import { signOut } from "firebase/auth";

const Provider = ({ children }) => {
  const router = useRouter()
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');
  const path = usePathname();
  if (!user && !userSession && path.includes("/admin")) {
    router.push('/admin')
  }
  if (user && userSession && (path == ("/admin") || path == ("/admin/"))) {
    router.push('/admin/items')
  }
  if (path == ("/") && user && userSession) {
    signOut(auth)
    sessionStorage.removeItem('user')
  }

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
        </>
      }
    </Prov>
  );
}

export default Provider;


