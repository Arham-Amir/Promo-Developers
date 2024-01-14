import Video from '@components/gallery/video/video';
import React from 'react';
import { TiTickOutline } from 'react-icons/ti';

const ChildComp = () => {
  const ethical = [
    ["Sustainability", "Ethical construction emphasizes sustainable practices that minimize the environmental footprint of building projects. This includes the use of eco-friendly materials, energy-efficient designs, and waste reduction strategies."],
    ["Community Engagement", "A crucial aspect of ethical construction involves engaging with local communities.This means consulting residents, addressing their concerns, and ensuring that construction projects contribute positively to the community's overall well-being."],
    ["Fair Labor Practices", "Ethical construction promotes fair wages, safe working conditions, and equal opportunities for all workers involved in the construction process.Contractors and developers are encouraged to prioritize the welfare of their workforce."],
    ["Transparency and Accountability", "Open communication and transparency are fundamental in ethical construction. Developers and contractors should communicate project details, potential environmental impacts, and community benefits openly. Accountability ensures that promises are kept and that any negative consequences are addressed promptly."],
    ["Innovation in Design and Technology", "Ethical construction embraces innovative design and technology solutions that not only enhance the efficiency of the construction process but also contribute to long - term sustainability.This can include the use of smart building technologies, renewable energy systems, and resilient design practices."]
  ]
  const sharia = [
    ["Prohibition of Riba (Usury or Interest)", "One of the fundamental principles of Sharia compliance is the prohibition of Riba. This forbids the charging or paying of interest on financial transactions. Instead, Islamic finance promotes profit and loss-sharing arrangements to ensure a fair distribution of risk and reward."],
    ["Avoidance of Gharar (Excessive Uncertainty)", "Sharia-compliant transactions must avoid excessive uncertainty or ambiguity (Gharar). This principle encourages transparency and clarity in financial agreements to protect both parties involved."],
    ["Prohibition of Maysir (Gambling or Speculation)", "Sharia compliance discourages speculative practices and considers them akin to gambling. Investments in businesses involved in activities such as gambling, alcohol, or pork-related products are typically avoided."],
    ["Asset-Backed Financing", "Islamic finance emphasizes tangible asset-backed financing, ensuring that financial transactions are linked to real economic activity. This principle aims to contribute to the real economy and discourage speculative practices."],
    ["Ethical Investment Screening", "Sharia - compliant investments must adhere to ethical and moral standards.Companies engaged in activities deemed unethical, such as those related to alcohol, gambling, or certain entertainment industries, are excluded from investment portfolios."],
    ["Social Responsibility(Zakat)", "Islamic finance incorporates the concept of Zakat, which is a form of almsgiving or charitable contribution.Financial institutions often allocate a portion of their profits for charitable purposes, promoting social welfare and economic justice."]
  ]

  return (
    <section className='flex flex-col'>
      <Video src={"https://www.youtube.com/embed/H2yM0VKFze8?si=ablgoRsRvDMTtv7e"} />
      <section className='flex-all-center flex-col gap-10 py-10 text-themeFont w-11/12 mx-auto'>
        <h1 className='font-themeFont'>Key Principles of Ethical Construction</h1>
        <section className='flex-all-center flex-wrap gap-8 md:w-11/12'>
          {ethical.map((el, i) => (
            <Card key={i} head={el[0]} detail={el[1]} />
          ))}
        </section>
        <h1 className='font-themeFont'>Key Principles of Sharia Compliance in Finance</h1>
        <section className='flex-all-center flex-wrap gap-8 md:w-11/12'>
          {sharia.map((el, i) => (
            <Card key={i} head={el[0]} detail={el[1]} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default ChildComp;

function Card({ head, detail }) {
  return <section className='flex gap-2 items-start md:hover:scale-110 transition duration-300'>
    <TiTickOutline className='text-themeFont text-xl' />
    <section className="flex gap-1 items-start justify-start flex-col">
      <p className="font-bold min-w-fit">{head}:</p>
      <p >{detail}</p>
    </section>
  </section>
}
