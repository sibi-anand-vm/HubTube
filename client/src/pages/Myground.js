import React,{useContext,useState,useEffect} from "react";
import Navbar2 from "../components/navbar2";
import VideoContext from "../contexts/VideoContext";
import UserContext from '../contexts/Usercontext';
import { useNavigate } from "react-router";
import Cardsarea from "../components/cardsarea";
import { getmyground } from "../services/apiService";
import '../styles/Myground.css'
const Myground=()=>{
    const navigate=useNavigate();
    const { user } = useContext(UserContext);
    const { loginvideo } = useContext(VideoContext);
    const [currVideoUrl, setCurrVideoUrl] = useState(null);
    const [videosArray, setVideosArray] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const videosData = await getmyground(user.UserID);
            setVideosArray(videosData);
          } catch (error) {
            console.error("Failed to fetch videos:", error);
          }
        };
        fetchVideos();
      }, []);
    const playbtnclicked = (videoData) => {
        setCurrVideoUrl(videoData.videoUrl);
        if(currVideoUrl)
        loginvideo(videoData);
        navigate('/videoscreen')
      };
return(
    <>
    <div className="fullgroundpage">
    <Navbar2 />
    <Cardsarea videosArray={videosArray} setCurrVideoUrl={playbtnclicked} title={"Contributions"}/>
    </div>
    </>
)
}
export default Myground;