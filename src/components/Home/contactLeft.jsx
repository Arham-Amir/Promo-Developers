'use client'
const ContactLeft = (props = {}) => {
  function handleClick() {
    console.log('ho')
  }
  return (
    <section className={`${props.className} bg-slate-300 rounded-l-lg`}>
      <section className='w-3/5 mx-auto my-10 flex flex-col items-center gap-8 text-indigo-950'>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Full_Name">FULL NAME</label>
          <input id="Full_Name" className='placeholder:text-indigo-950 placeholder:opacity-70  border-2 bg-white h-10 py-5 px-2 focus-within:outline-none rounded-lg' type="text" placeholder='Full Name' />
        </section>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Email">EMAIL</label>
          <input className='placeholder:text-indigo-950 placeholder:opacity-70 w-full border-2 bg-white h-10 py-5 px-2 focus-within:outline-none rounded-lg' type="email" name="email" id="email" placeholder='Email' />
        </section>
        <section className="w-full flex flex-col gap-2">
          <label className="ml-1 font-semibold text-sm" htmlFor="Message">MESSAGE</label>
          <textarea className='w-full border-2 bg-white h-[100px] p-2 focus-within:outline-none rounded-lg' name="message" cols="30" rows="10" placeholder='Message' id = 'Message'></textarea>
        </section>
        <button className='py-3 px-7 mt-2 w-full border-4 bg-indigo-950 text-white rounded-full' onClick={handleClick}>Submit</button>
      </section>
    </section>
  );
}

export default ContactLeft;