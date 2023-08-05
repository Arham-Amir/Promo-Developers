const RightBox = (props = {}) => {
  return (
    <section className={`${props.class} fixed bottom-4 right-0` }>
      <section className="flex flex-col bg-slate-500 my-2 mx-2 py-4 rounded-2xl shadow-lg
      shadow-gray-700 ">
        <section className={`bg-house-img h-20 mx-2`}>
        </section>
        <section className="box-border mx-6 p-2 border-x-4 border-b-4 rounded-b-2xl border-blue-950 h-[62vh]">
          Right Box
        </section>
      </section>
    </section>
  );
}

export default RightBox;
