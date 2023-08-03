import Link from 'next/link';
import { ImMenu } from 'react-icons/im'
const Nav_Links = () => {
  return (<>
    <div className="lg:flex gap-12 font-normal nav_links xs:hidden">
      <Link href="/" className="">Home </Link>
      <Link href="/admin" className="">Admin</Link>
      <Link href="/dashboard" className="">Existing Items </Link>
      <Link href="/addItem" className="">Add Item </Link>
    </div>
    <ImMenu className='lg:hidden' size={25}/>
  </>
  );
}

export default Nav_Links;
