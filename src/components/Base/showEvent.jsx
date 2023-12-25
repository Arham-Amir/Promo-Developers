'use client'
import React, { useEffect } from 'react';

const ShowEvent = () => {
  useEffect(() => {
    document.getElementById("upComingEvent").showModal();
  }, []);
  return (
    <section>
    </section>
  );
}

export default ShowEvent;
