const Nav_Logo = () => {
  return (
    <section className="flex gap-2 items-center">
      <img src="/image/nav_logo.gif" alt="navbar_logo"
        className="h-16 2xl:h-24 sm:block" />
      <p className="md:text-lg xs:text-sm 2xl:text-2xl font-bold">Promo <span className="text-red-600">Developers</span></p>
    </section>
  );
}

export default Nav_Logo;
