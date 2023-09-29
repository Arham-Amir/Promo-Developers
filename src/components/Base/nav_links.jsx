'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillStar } from 'react-icons/ai'

const NavLinks = (props = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(url) {
    if (props.showLinks) {
      props.show();
    }
    router.push(url);
  }

  return (
    <section className={`${props.className}`}>
      <button
        className={`${pathname === "/" ? "lg:border-t-2 lg:border-t-themeFont" : "bg-transparent lg:hover:border-t-2 lg:hover:border-t-themeFont"
          } p-2 text-xl`}
        onClick={() => handleClick("/")}
      >
        Home
      </button>
      <button
        className={`text-xl lg:hover:border-t-2 lg:hover:border-t-themeFont p-2`}
        onClick={() => handleClick("#aboutus")}
      >
        About
      </button>
      <button
        className={`text-xl lg:hover:border-t-2 lg:hover:border-t-themeFont p-2`}
        onClick={() => handleClick("#contactus")}
      >
        ContactUs
      </button>
      <button
        className={`flex items-center gap-1 text-xl lg:hover:border-t-2 lg:hover:border-t-themeFont p-2`}
        onClick={() => handleClick("/member")}
      >
        Become a member <AiFillStar className="text-yellow-400" />
      </button>
      <section className="bg-themeFont ml-2 rounded-md w-fit">
        <section className="border-themeFont bg-navBg border -translate-x-[2px] -translate-y-[2px] px-5 py-2 rounded-md hover:-translate-x-1 hover:-translate-y-1 ease-in-out transition duration-300 text-xl">
          <Link href="/calculator">Calculator</Link>
        </section>
      </section>
    </section>
  );
};

export default NavLinks;
