// 'use client'
// import Nav_Logo from "@components/Base/nav_logo";
// import Nav_Links from "@components/Base/nav_links";
// import AdminNav_Links from "@components/Base/adminNav_Links";
// import { useState } from "react";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const pathname = usePathname()

//   return (
//     <section className="w-full z-30">
//       <nav className={`bg-navBg backdrop-blur-sm  text-navTxt w-full px-5 sm:px-10 lg:px-14 z-30 h-[12vh] flex justify-between items-center text-lg  relative`}>
//         <Nav_Logo></Nav_Logo>
//         {path.includes("/admin")
//           ? <AdminNav_Links
//             className={"items-center gap-7 text-lg 2xl:text-2xl font-medium hidden lg:flex flex-row"} showLinks={showLinks} show={() => setShowLinks(false)}>
//           </AdminNav_Links>
//           : <Nav_Links
//             className={"items-center gap-7 text-lg 2xl:text-2xl font-medium hidden lg:flex flex-row"} showLinks={showLinks} show={() => setShowLinks(false)}>
//           </Nav_Links>
//         }

//         <section onClick={() => { setShowLinks(!showLinks) }} className="z-30 flex flex-col items-end gap-2 lg:hidden " >
//           <p className={`${showLinks ? 'w-8 rotate-[495deg]' : 'w-9'}  transition-all duration-500 p-[1px] bg-bg-dark`}></p>
//           <p className={`w-7 p-[1px] transition-all duration-500 bg-bg-dark ${showLinks ? 'opacity-0' : 'opacity-100'} transform ${showLinks ? '-translate-y-10' : 'translate-y-0'}`}></p>
//           <p className={`${showLinks ? 'w-8 rotate-[405deg] -translate-y-[19px]' : 'w-5'} transition-all duration-500   p-[1px] bg-bg-dark`}></p>
//         </section>

//         <Nav_Links showLinks={showLinks} show={() => setShowLinks(false)}
//           className={`flex ${showLinks ? 'right-0' : 'right-[-100%]'} z-20 lg:hidden
//       fixed top-0 h-screen sm:w-full w-full transition-all duration-500 justify-center nav_bg text-lightFont flex-col items-center gap-5`}>
//         </Nav_Links >
//       </nav>
//     </section>
//   );
// }

// export default Navbar;

'use client'
import { Link as Lin } from "react-scroll";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LazyImage from "./lazyImage";
import { AiFillStar } from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "@api/dbConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import useStorage from "@api/storage";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user] = useAuthState(auth);
  const { getItem } = useStorage();
  const userSession = getItem()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const path = usePathname();
  useEffect(() => {
    setDropdownOpen(false);
  }, [path])

  return (
    <div className="navbar bg-bg h-[12vh] z-30 text-black items-center">
      <div className="navbar-start flex-row-reverse xl:flex-row justify-between xl:justify-start w-full xl:w-1/2">
        <div className="dropdown z-30">
          <label tabIndex={0} className="btn btn-ghost xl:hidden" onClick={toggleDropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} onClick={() => setIsDropdownOpen(false)}
            className={`z-30 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${isDropdownOpen ? 'block' : 'hidden'} right-0`}>
            <li className={`${path == '/' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}>
              <Link href="/">Home</Link></li>
            {path.includes("/admin")
              ? <>
                <li className={`${path == '/admin/items' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                  href="/admin/items">Items-Pricing</Link></li>
                <li className={`${path == '/admin/landSize' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                  href="/admin/landSize">LandSizes</Link></li>
                <li className={`${path == '/admin/areas' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                  href="/admin/areas">Areas</Link></li>
                <li><button onClick={() => {
                  signOut(auth)
                  sessionStorage.removeItem('user')
                }} className="py-3 bg-themeFont text-white flex items-center justify-center h-fit bg-themeColor rounded-3xl">Logout</button></li>
              </> : <>
                <li >
                  <a className={`${path == '/construction-services' || path == '/material-estimation' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}>Services</a>
                  <ul className="p-2 z-30 min-w-max">
                    <li><Link href="/construction-services" className="cursor-pointer min-w-fit hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold">Construction Services</Link></li>
                    <li><Link href="/material-estimation" className="cursor-pointer min-w-fit hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold">Material Estimation</Link></li>
                  </ul>
                </li>
                <li className={`${path == '/gallery' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link href="/gallery">Gallery</Link></li>
                <li className={`${path == '/member' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link href="/member">Become a member<AiFillStar className="text-yellow-400" /></Link></li>
                <li className={`cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Lin to="contactus" spy={true} smooth={true} duration={500} >Contact Us</Lin></li>
                <li><a href="https://wa.me/+923004439445" target="blank" className="py-3 bg-themeFont text-white flex items-center justify-center h-fit bg-themeColor rounded-3xl">Whatsapp</a></li>
              </>}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-themeFont">
          <LazyImage className="h-full w-fit object-contain mr-1" src="/image/nav_logo.gif" />
          <p className="xxs:hidden block text-xl">Promo Developers</p>
        </Link>
      </div>
      <div className="navbar-center hidden xl:flex justify-between">
        <ul className="menu menu-horizontal px-1">
          <li className={`${path == '/' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link href="/">Home</Link></li>
          {path.includes("/admin") && user && userSession
            ? <>
              <li className={`${path == '/admin/items' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                href="/admin/items">Items-Pricing</Link></li>
              <li className={`${path == '/admin/landSize' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                href="/admin/landSize">LandSizes</Link></li>
              <li className={`${path == '/admin/areas' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link
                href="/admin/areas">Areas</Link></li>
            </> : !path.includes("/admin") && <>
              <li tabIndex={0} >
                <details {...(dropdownOpen == false ? { open: true } : {})}>
                  <summary onClick={() => setDropdownOpen(!dropdownOpen)} className={`${path == '/construction-services' || path == '/material-estimation' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}>Services</summary>
                  {dropdownOpen && (<ul className="p-2 z-30 min-w-max">
                    <li><Link href="/construction-services" onClick={() => setDropdownOpen(false)} className="cursor-pointer min-w-fit hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold">Construction Services</Link></li>
                    <li><Link href="/material-estimation" onClick={() => setDropdownOpen(false)} className="cursor-pointer min-w-fit hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold">Material Estimation</Link></li>
                  </ul>)}
                </details>
              </li>
              <li className={`${path == '/gallery' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link href="/gallery">Gallery</Link></li>
              <li className={`${path == '/member' ? 'scale-110 font-bold text-themeFont' : 'scale-100 font-normal'} cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Link href="/member">Become a member<AiFillStar className="text-yellow-400" /></Link></li>
              <li className={`cursor-pointer hover:scale-110 transition duration-100 hover:text-themeFont hover:font-bold`}><Lin to="contactus" spy={true} smooth={true} duration={500} >Contact Us</Lin></li>
            </>}
        </ul>
      </div>
      {path.includes("/admin") && user && userSession
        ?
        <div className="hidden xl:flex navbar-end">
          <button onClick={() => {
            signOut(auth)
            sessionStorage.removeItem('user')
          }} className="py-3 bg-themeFont text-white flex items-center justify-center h-fit bg-themeColor rounded-3xl">Logout</button>
        </div>
        : !path.includes("/admin") &&
        <div className="hidden xl:flex navbar-end">
          <a href="https://wa.me/+923004439445" target="blank" className="btn bg-themeFont text-white bg-themeColor rounded-3xl">Whatsapp</a>
        </div>
      }
    </div>
  );
}

export default Navbar;

