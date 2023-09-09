'use client'
import Nav_Logo from "@components/Base/nav_logo";
import Nav_Links from "@components/Base/nav_links";
import AdminNav_Links from "@components/Base/adminNav_Links";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const pathname = usePathname()

  return (
    <section className="sticky w-full top-0 z-30">
      <nav className={`nav_bg bg-transparent shadow-lg text-lightFont w-full lg:px-14 sm:px-10 xs:px-5 z-30 h-[14vh] flex justify-between items-center text-lg font-themeFont relative`}>
        <Nav_Logo></Nav_Logo>
        {pathname.includes("/admin")
          ? <AdminNav_Links
            className={"items-center gap-7 text-lg 2xl:text-2xl font-medium xs:hidden lg:flex flex-row"} showLinks={showLinks} show={() => setShowLinks(false)}>
          </AdminNav_Links>
          : <Nav_Links
            className={"items-center gap-7 text-lg 2xl:text-2xl font-medium xs:hidden lg:flex flex-row"} showLinks={showLinks} show={() => setShowLinks(false)}>
          </Nav_Links>}

        <section onClick={() => { setShowLinks(!showLinks) }} className="z-30 lg:hidden xs:flex flex-col items-end gap-2" >
          <p className={`${showLinks ? 'w-8 rotate-[495deg]' : 'w-9'}  transition-all duration-500 p-[1px] bg-lightFont`}></p>
          <p className={`w-7 p-[1px] transition-all duration-500 bg-lightFont ${showLinks ? 'opacity-0' : 'opacity-100'} transform ${showLinks ? '-translate-y-10' : 'translate-y-0'}`}></p>
          <p className={`${showLinks ? 'w-8 rotate-[405deg] -translate-y-[19px]' : 'w-5'} transition-all duration-500   p-[1px] bg-lightFont`}></p>
        </section>

        <Nav_Links showLinks={showLinks} show={() => setShowLinks(false)}
          className={`xs:flex ${showLinks ? 'xs:right-0' : 'xs:right-[-100%]'} z-20 lg:hidden
      fixed top-0 h-screen sm:w-full xs:w-full transition-all duration-500 justify-center nav_bg text-lightFont flex-col items-center gap-5`}>
        </Nav_Links >
      </nav>
    </section>
  );
}

export default Navbar;
