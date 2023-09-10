const Intro = () => {
  return (
    <section className="my-8 py-8 bg-bg w-screen flex items-center justify-center">
      <section className="p-5 w-[96%] text-bg-dark flex flex-col gap-10">
        <section className="flex gap-5 items-center">
          <h1 className="text-3xl font-bold pl-1 font-heading">Browse Properties</h1>
          <span className="w-1/4 h-[2px] bg-bg-dark"></span>
        </section>
        <section className="grid grid-cols-4 gap-5 h-full">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
    </section>
  );
}

export default Intro;

const Card = () => {
  return (<>
    <section className="glow-section font-themeFont border border-gray-400 shadow-md shadow-black p-5 rounded-2xl flex flex-col gap-3">
      <h1 className="text-xl font-bold">5 Marla</h1>
      <hr />
      <section className="flex flex-col gap-3">
        <p className="border text-lg p-3">Al Kabir Town</p>
        <p className="border text-lg p-3">Bahria</p>
        <button className="border p-3 text-lg hover:bg-gray-300 font-bold text-themeFont">View All</button>
      </section>
    </section>
  </>
  );
}


