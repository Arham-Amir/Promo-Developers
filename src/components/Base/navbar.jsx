'use client'
import Nav_Logo from "@components/Base/nav_logo";
import Nav_Links from "@components/Base/nav_links";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  return (<>
    <nav className={` bg-bg-dark shadow-lg text-lightFont w-full sm:px-14 xs:px-3 z-30 xs:h-[12vh] 2xl:h-24 flex justify-between items-center text-lg font-bold`}>
      <Nav_Logo></Nav_Logo>
      <Nav_Links className={"items-center gap-7 text-lg 2xl:text-2xl font-medium"} showLinks={showLinks} show={() => setShowLinks(false)}></Nav_Links>
      <section className="bg-themeFont flex items-center justify-center rounded-full p-3">
        <Link className="" href="/calculator">Calculator</Link>
      </section>
      <section className="lg:hidden">
        <button onClick={() => setShowLinks(!showLinks)}
          className="xs:flex xs:items-end xs:flex-col">
          <p className="w-5 border-t-2 border-white mb-1"></p>
          <p className="w-5 border-t-2 border-white mb-1"></p>
          <p className="w-5 border-t-2 border-white mb-1"></p>
        </button>
      </section>
    </nav>
    <Nav_Links showLinks={showLinks} show={() => setShowLinks(false)}
      className={`xs:fixed xs:z-10 xs:bg-black xs:p-4
    ${showLinks ? 'xs:bottom-0 xs:top-16' : 'xs:bottom-[100%]'}
    xs:pt-8 xs:bg-opacity-50 sm:w-4/5 xs:w-full left-1/2 -translate-x-1/2 xs:h-auto xs:backdrop-blur-lg xs:text-xl  xs:flex xs:flex-col xs:items-center xs:gap-10 xs:transition-all xs:duration-200 xs:ease-in-out xs:text-white xs:font-bold lg:hidden`}>
    </Nav_Links >
  </>
  );
}

export default Navbar;
