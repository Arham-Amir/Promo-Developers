// import nav_logo from 'next/image'
const Nav_Logo = () => {
  return (
    <div className="flex items-center gap-3 font-medium sm:text-lg lg:text-2xl 2xl:text-4xl">
      <img src='/image/nav_logo.png' width={70} alt="Company Logo Image for Navbar" />
      <p>
        Promo Developers
      </p>
    </div>
  );
}

export default Nav_Logo;
