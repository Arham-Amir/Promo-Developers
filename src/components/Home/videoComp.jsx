const VideoComp = () => {
  return (
    <section className="w-full h-[60vh] lg:h-[88vh] flex items-center justify-center bg-bg">
      <video className="object-cover w-11/12 h-[90%] rounded-2xl"
        src="https://assets.spitfirehomes.co.uk/app/uploads/2023/04/03152828/Hawkstone-Kitchen.mp4" autoPlay loop muted playsInline></video>
    </section>
  );
}

export default VideoComp;
