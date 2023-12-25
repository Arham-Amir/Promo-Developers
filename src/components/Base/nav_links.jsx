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
        className={`${pathname === "/" ? "lg:bg-themeFont text-lightFont" : "bg-transparent lg:hover:bg-themeFont hover:text-lightFont"
          } text-xl`}
        onClick={() => handleClick("/")}
      >
        Home
      </button>
      <section className="relative group">
        <button
          className={`text-xl lg:hover:bg-themeFont hover:text-lightFont`}
          onClick={() => handleClick("#aboutus")}
        >
          Services
        </button>
        <section className="absolute top-full bg-bg rounded-md border-2 min-w-max  hidden group-hover:flex flex-col p-2">
          <button
            className={`min-w-fit lg:hover:bg-themeFont hover:text-lightFont`}
            onClick={() => handleClick("#aboutus")}
          >
            Construction Services
          </button>
          <button
            className={`min-w-fit lg:hover:bg-themeFont hover:text-lightFont`}
            onClick={() => handleClick("#aboutus")}
          >
            Other Services
          </button>
        </section>
      </section>
      <button
        className={`text-xl lg:hover:bg-themeFont hover:text-lightFont`}
        onClick={() => handleClick("#contactus")}
      >
        ContactUs
      </button>
      <button
        className={`flex items-center gap-1 text-xl lg:hover:bg-themeFont hover:text-lightFont`}
        onClick={() => handleClick("/member")}
      >
        Become a member <AiFillStar className="text-yellow-400" />
      </button>
      {/* <section className="bg-themeFont ml-2 rounded-md w-fit">
        <section className="border-themeFont bg-navBg border -translate-x-[2px] -translate-y-[2px] px-5 py-2 rounded-md hover:-translate-x-1 hover:-translate-y-1 ease-in-out transition duration-300 text-xl">
          <Link href="/calculator">Calculator</Link>
        </section>
      </section> */}
    </section>
  );
};

export default NavLinks;
