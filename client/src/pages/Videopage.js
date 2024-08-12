import React, { useContext } from 'react';
import VideoContext from "../contexts/VideoContext";
import Videoplayer from '../components/videoplayer';
import Navbar4 from '../components/navbar4'
import '../styles/videopage.css'
const Videopage = () => {
  const { video } = useContext(VideoContext);

  return (
    <div className='fullvidpage' style={{ backgroundColor: 'rgb(104, 29, 29)' }}>
      <Navbar4 />
      {video ? (
        <>
          <Videoplayer videoUrl={video.videoUrl} />
        </>
      ) : (
        <div className="no-video">
        <h1 style={{ textAlign: "center", color: "red",backgroundColor: 'rgb(37, 37, 37)' , fontSize:"50px"}}>No video selected!</h1>
        </div>
      )}
    </div>
  );
};

export default Videopage;
