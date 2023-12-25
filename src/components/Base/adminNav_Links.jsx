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
      <button className={`${pathname == '/' ? 'lg:bg-themeFont text-lightFont' : 'bg-transparent lg:hover:bg-themeFont hover:text-lightFont'} text-xl`} onClick={(e) => { handleClick(e, '/') }}>Home</button>
      <button className={`${pathname == '/admin/items' ? 'lg:bg-themeFont text-lightFont' : 'bg-transparent lg:hover:bg-themeFont hover:text-lightFont'} text-xl`} onClick={(e) => { handleClick(e, '/admin/items') }}>Items</button>
      <button className={`${pathname == '/admin/categories' ? 'lg:bg-themeFont text-lightFont' : 'bg-transparent lg:hover:bg-themeFont hover:text-lightFont'} text-xl`} onClick={(e) => { handleClick(e, '/admin/categories') }}>Add Category</button>
      <button className={`${pathname == '/admin/landSize' ? 'lg:bg-themeFont text-lightFont' : 'bg-transparent lg:hover:bg-themeFont hover:text-lightFont'} text-xl`} onClick={(e) => { handleClick(e, '/admin/landSize') }}>LandSizes</button>
      <button className={`${pathname == '/admin/areas' ? 'lg:bg-themeFont text-lightFont' : 'bg-transparent lg:hover:bg-themeFont hover:text-lightFont'} text-xl`} onClick={(e) => { handleClick(e, '/admin/areas') }}>Areas</button>
    </section>
  );
}

export default AdminNav_Links;
