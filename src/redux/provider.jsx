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
import useStorage from '@api/storage';
import { useEffect, useState } from "react";
import PalestinePoster from "@components/Base/palestinePoster";

const Provider = ({ children }) => {
  const router = useRouter()
  const [user] = useAuthState(auth);
  const { getItem, removeItem } = useStorage();
  const userSession = getItem();
  const path = usePathname();
  const [loadingAdmin, setLoadingAdmin] = useState(path.includes("/admin") ? true : false);

  useEffect(() => {
    if (!user && !userSession && path.includes("/admin")) {
      router.push('/admin')
    }
  }, []);
  useEffect(() => {
    setLoadingAdmin(false)
  }, []);

  if (path == ("/") && user && userSession) {
    signOut(auth)
    removeItem()
  }

  return (
    <Prov store={store}>
      {loadingAdmin ? <span className="loading loading-dots loading-lg text-themeFont" />
        : children}
      {!path.includes("/admin")
        && <>
          {/* <ShowEvent /> */}
          <ContactPopUpBtn />
          {/* <UpComingEvent /> */}
          <ContactUs />
          <Fotter />
        </>
      }
      {path == '/' && <PalestinePoster />}
    </Prov>
  );
}

export default Provider;


