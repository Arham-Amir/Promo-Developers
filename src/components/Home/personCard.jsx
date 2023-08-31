const PersonCard = () => {
  return (
    <section className="bg-bg-light flex flex-col items-center gap-4
    p-16 rounded-3xl">
      <img src="/image/accountant.jpg" alt="image" className="w-20 h-20 rounded-full" />
      <h2 className="xs:text-lg sm:text-xl font-semibold text-center">Farhan Ahmed</h2>
      <h3 className="">Architect</h3>
    </section>
  );
}

export default PersonCard;
