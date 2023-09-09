'use client'
import { usePathname, useRouter } from "next/navigation";

const AdminNav_Links = (props = {}) => {
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
      <button className={`${pathname == '/' ? 'lg:border-t-2 lg:border-t-themeFont' : 'bg-transparent lg:hover:border-t-2 hover:border-t-themeFont'}  p-2 text-xl`} onClick={(e) => { handleClick(e, '/') }}>Home</button>
      <button className={`text-xl lg:hover:border-t-2 hover:border-t-themeFont p-2`} onClick={(e) => { handleClick(e, '/admin/items') }}>Items</button>
      <button className={`text-xl lg:hover:border-t-2 hover:border-t-themeFont p-2`} onClick={(e) => { handleClick(e, '/admin/landSize') }}>LandSizes</button>
      <button className={`text-xl lg:hover:border-t-2 hover:border-t-themeFont p-2`} onClick={(e) => { handleClick(e, '/admin/areas') }}>Areas</button>
    </section>
  );
}

export default AdminNav_Links;
