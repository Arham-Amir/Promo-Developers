import React from 'react';

const Video = ({ src }) => {
  return (
    <section className='max-w-screen h-[65vh] md:h-screen bg-bg'>
      <section className='mx-auto w-11/12 h-full py-10 md:p-10'>
        <iframe className={`w-full h-full rounded-3xl`} src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </section>
    </section>
  );
}

export default Video;
