'use client'
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [userType, setUserType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [web, setWeb] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [otherProfession, setOtherProfession] = useState('');
  const [showOtherProfessionInput, setShowOtherProfessionInput] = useState(false);
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleWebChange = (event) => {
    setWeb(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    setUserType(selectedUserType);
    setShowOtherProfessionInput(selectedUserType === 'Other');
  };
  const handleOtherProfessionChange = (event) => {
    setOtherProfession(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleOfficeAddressChange = (event) => {
    setOfficeAddress(event.target.value);
  };
  const handleBusinessCardImagesChange = (event) => {
    setBusinessCardImages(event.target.files);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      userType === '' ||
      (userType === 'Other' && otherProfession === '') ||
      name === '' ||
      email === '' ||
      phoneNumber === '' ||
      officeAddress === '' ||
      (businessCardImages && businessCardImages.length === 0)
    ) {
      toast.error('Please Complete All Form Fields First.');
      return;
    }
    const templateParams = {
      user_type: userType,
      name,
      email,
      phone_number: phoneNumber,
      office_address: officeAddress,
      other_profession: otherProfession,
      message,
      web,
    };
    for (const key in templateParams) {
      forlgata[key] = templateParams[key];
    }
    emailjs.send(
      "service_qx54ocn",
      "template_vf0abcq",
      forlgata,
      "3uBa2MTILF_j_PX_3"
    ).then(function (response) {
      toast.success('Your Response has been sent successfully!');
    }, function (error) {
      toast.error('Sending your response failed. Please try again later.');
    });
  }

  return (
    <section className="h-auto w-auto py-12 bg-bg">
      <section className="flex flex-col-reverse lg:flex-row justify-center items-center gap-5 lg:gap-0 h-auto relative">
        <section className="w-11/12 lg:w-[60%] h-fit flex justify-center items-center flex-col gap-5">
          <h1 className="text-3xl font-themeFont font-bold text-themeFont">Tell me about yourelf</h1>
          <section className="flex justify-center items-center flex-col gap-4 min-w-max font-sans">
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">I am/ We Are :</p>
              <select className="select select-bordered w-fit" value={userType} onChange={handleUserTypeChange}>
                <option disabled selected>Who You Are</option>
                <option>Architect</option>
                <option>Society Developer</option>
                <option>Builder</option>
                <option>State Agent</option>
                <option>Material Provider</option>
                <option>Other</option>
              </select>
            </section>
            {showOtherProfessionInput && (
              <section className="flex gap-2 items-center justify-between w-full">
                <p className="w-fit">Other Profession :</p>
                <input type="text" placeholder="Your profession" className="input input-bordered w-fit font-bold" value={otherProfession} onChange={handleOtherProfessionChange} />
              </section>
            )}
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">Name :</p>
              <input type="text" placeholder="xyz" className="input input-bordered w-fit font-bold" value={name} onChange={handleNameChange} />
            </section>
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">Email :</p>
              <input type="email" placeholder="xyz@xyz.com" className="input input-bordered w-fit font-bold" value={email} onChange={handleEmailChange} />
            </section>
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">Phone Number :</p>
              <input type="tel" placeholder="03xx-xxxxxxx" className="input input-bordered w-fit font-bold" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </section>
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">Office Address :</p>
              <input type="text" placeholder="xyz" className="input input-bordered w-fit font-bold" value={officeAddress} onChange={handleOfficeAddressChange} />
            </section>
            <section className="flex gap-2 items-center justify-between w-full">
              <p className="w-fit">Website (If any) :</p>
              <input type="text" placeholder="xyz" className="input input-bordered w-fit font-bold" value={web} onChange={handleWebChange} />
            </section>
            <section className="flex flex-col gap-4 items-center justify-between w-full">
              <p className="min-w-full text-start">Message:</p>
              <textarea
                placeholder="Your message"
                className="textarea textarea-bordered w-full max-w-xs"
                value={message}
                onChange={handleMessageChange}
              />
            </section>
            <button className="btn px-8 mt-2 text-white bg-themeFont" onClick={handleFormSubmit}>Submit</button>
          </section>
        </section>
        <section className="w-11/12 lg:w-[40%] h-[50vh] lg:h-[84vh] lg:sticky lg:top-12 lg:right-0">
          <img src="/image/contactUs.gif" className="h-[90%] w-full lg:w-[80%] object-fit" alt="contactusgif" />
        </section>
      </section>
    </section>
  );
}

export default Page;
