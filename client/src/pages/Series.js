import React,{useState,useContext,useEffect} from "react";
import VideoContext from "../contexts/VideoContext";
import { getallSeries } from "../services/apiService";
import { useNavigate } from "react-router";
import Cardsarea from "../components/cardsarea";
import {toast } from "react-toastify";
import '../styles/series.css'
import Navbar2 from "../components/navbar2";
const Seriespage=()=>{
    const { loginvideo } = useContext(VideoContext);
    const [videosArray, setVideosArray] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const videosData = await getallSeries();
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
    
return(
    <>
    <div className="fullseriespage">
    <div className='forthumb1'>
    <Navbar2 />
                    <div className='block52'>
                        <h1>Stranger Things</h1>
                        <h2>Out Now</h2>
                        <button className='play1btn' onClick={() => playbtnclicked({ videoUrl: 2, title: "Sample Video" })}>Play</button>
                    </div>
                </div>
                <Cardsarea videosArray={videosArray} setCurrVideoUrl={playbtnclicked} title={"On Prime"}/>
                </div>
    </>
)
}
export default Seriespage;