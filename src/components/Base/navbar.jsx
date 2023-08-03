import Nav_Logo from "@components/Base/nav_logo";
import Nav_Links from "@components/Base/nav_links";
const Navbar = () => {
  return (
    <nav className="w-[92vw] mx-auto mb-5 rounded-b-2xl sticky top-0 z-10 bg-opacity-60 backdrop-blur-lg shadow-lg bg-zinc-100 h-20 2xl:h-24 text-blue-950 py-3 lg:pl-10 lg:pr-24 sm:px-10 xs:px-4 xl:text-xl
    lg:text-md 2xl:text-3xl flex items-center justify-between font-sans">
      <Nav_Logo></Nav_Logo>
      <Nav_Links></Nav_Links>
    </nav>
  );
}

export default Navbar;
