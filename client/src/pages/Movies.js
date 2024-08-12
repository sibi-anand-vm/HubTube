import React,{useState,useContext,useEffect} from "react";
import VideoContext from "../contexts/VideoContext";
import { getallMovies } from "../services/apiService";
import { useNavigate } from "react-router";
import Cardsarea from "../components/cardsarea";
import '../styles/movies.css'
import Navbar2 from "../components/navbar2";
import { toast } from "react-toastify";
const Moviespage=()=>{
    const { loginvideo } = useContext(VideoContext);
    const [videosArray, setVideosArray] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const videosData = await getallMovies();
            setVideosArray(videosData);
          } catch (error) {
            toast.error("Failed to fetch videos:", error);
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
    <div className="fullmoviespage">
    <div className='forthumb71'>
      <Navbar2 />
                    <div className='block72'>
                        <h1>Fast And Furious 7</h1>
                        <h2>Out Now</h2>
                        <button className='play3btn' onClick={() => playbtnclicked({ videoUrl: 3, title: "Sample Video" })}>Play</button>
                    </div>
                </div>
                <Cardsarea videosArray={videosArray} setCurrVideoUrl={playbtnclicked} title={"On Trend"}/>
                </div>
    </>
)
}
export default Moviespage;