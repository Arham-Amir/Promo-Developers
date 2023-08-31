'use client'
import { usePathname, useRouter } from "next/navigation";

const Nav_Links = (props = {}) => {
  const router = useRouter();
  const pathname = usePathname()
  function handleClick(e, url) {
    if (props.showLinks) {
      props.show()
    }
    router.push(url)
  }

  return (
    <section className={`${props.className}`}>
      {/* <button onClick={(e) => { handleClick(e, '/calculator') }}>Calculator</button> */}
      <button className={`${pathname == '/' ? 'border-t-2 border-t-themeFont': 'bg-transparent hover:border-t-2 hover:border-t-themeFont'}  p-2 text-lg font-bold`} onClick={(e) => { handleClick(e, '/') }}>Home</button>
      <button className={`text-lg font-bold hover:border-t-2 hover:border-t-themeFont p-2`} onClick={(e) => { handleClick(e, '#aboutus') }}>About</button>
      <button className={`text-lg font-bold hover:border-t-2 hover:border-t-themeFont p-2`} onClick={(e) => { handleClick(e, '#contactus') }}>ContactUs</button>
    </section>
  );
}

export default Nav_Links;
