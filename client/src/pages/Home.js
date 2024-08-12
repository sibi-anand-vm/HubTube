import React, { useState, useEffect, useContext } from "react";
import { getallvideos } from "../services/apiService";
import Cardsarea from "../components/cardsarea";
import Navbar2 from "../components/navbar2";
import '../styles/home.css';
import { useNavigate } from "react-router";
import VideoContext from "../contexts/VideoContext";
import { toast } from "react-toastify";
const Home = () => {
  const { loginvideo } = useContext(VideoContext);
  const [videosArray, setVideosArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await getallvideos();
        setVideosArray(videosData);
      } catch (error) {
       toast.error(error);
      }
    };
    fetchVideos();
  }, []);

  const playbtnclicked = (videoData) => {
    loginvideo(videoData);
    navigate('/videoscreen');
  };

  return (
    <div className="fullhomepage">
      <div className="forthumb">
        <Navbar2 />
        <div className='block32'>
          <h1>JD Vs Bhavani</h1>
          <h2>For You</h2>
          <button className='playbtn' onClick={() => playbtnclicked({ videoUrl: 1, title: "Sample Video" })}>Play</button>
        </div>
      </div>
      <Cardsarea videosArray={videosArray} setCurrVideoUrl={playbtnclicked} title={"Top Picks for You"} />
    </div>
  );
};

export default Home;
