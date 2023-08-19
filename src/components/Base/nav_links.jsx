import { useRouter } from "next/navigation";
const Nav_Links = (props = {}) => {
  const router = useRouter();
  function handleClick(e, url) {
    if (props.showLinks) {
      props.show()
    }
    router.push(url)
  }

  return (
    <section className={`${props.className} `}>
      <button onClick={(e) => { handleClick(e, '/') }}>Home</button>
      <button onClick={(e) => { handleClick(e, '/calculator') }}>Calculator</button>
      <button onClick={(e) => { handleClick(e, '#aboutus') }}>About</button>
      <button onClick={(e) => { handleClick(e, '#contactus') }}>ContactUs</button>
    </section>
  );
}

export default Nav_Links;
