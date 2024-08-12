import React, { useEffect, useState, useContext } from "react";
import '../styles/Adminright.css';
import logimg from '../assets/num1.png';
import UserContext from "../contexts/Usercontext";
import { ToastContainer, toast } from 'react-toastify';
import { getallusers, getallvideos, deluser, getdashcount, delvideo, getvdoreq, delvideoreq, postvidreqData, postvidData } from "../services/apiService";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { useNavigate } from "react-router";
import VideoContext from "../contexts/VideoContext";
const Adminright = ({ sidebarval, usersArray, setUsersArray }) => {
  const navigate = useNavigate();
  const { loginvideo } = useContext(VideoContext);
  const { user } = useContext(UserContext);
  const [videosArray, setVideosArray] = useState([]);
  const [videosreqArray, setVideosReqArray] = useState([]);
  const [counts, setCounts] = useState({
    userCount: 0,
    movieCount: 0,
    seriesCount: 0,
  });
  const [loading, setLoading] = useState(false); // New loading state
  const fetchData = async () => {
    setLoading(true);
    try {
      switch (sidebarval) {
        case 2:
          if (usersArray.length === 0) {
            const usersData = await getallusers();
            setUsersArray(usersData);
          }
          break;
        case 3:
          if (videosArray.length === 0) {
            const videosData = await getallvideos();
            setVideosArray(videosData);
          }
          break;
        case 5:  
        if(videosreqArray.length===0){
        const videosReqData = await getvdoreq();
        setVideosReqArray(videosReqData);
        }
        break;
        default:
          const countsData = await getdashcount();
          setCounts(countsData);
          break;
      }
    } catch (error) {
      toast.error('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchgetData = async () => {
    setLoading(true);
    try {
      switch (sidebarval) {
        case 2:
          const usersData = await getallusers();
          setUsersArray(usersData);
          break;
        case 3:
          const videosData = await getallvideos();
          setVideosArray(videosData);
          break;
        case 5:
          const videosReqData = await getvdoreq();
          setVideosReqArray(videosReqData);
          break;
        default:  
      }
      const countsData = await getdashcount();
      setCounts(countsData);
    } catch (error) {
      toast.error('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchgetData();
    fetchData();
  }, [sidebarval, setUsersArray]);
  const playbtnclicked = (videoData) => {
    loginvideo(videoData);
    navigate('/videoscreen');
  };

const handleAddVideo=async(video)=>{
  let title =video.title
    let genre =video.genre
    const isSeries = video.isSeries
    let duration = video.duration
    let VideoID=video.VideoID;
    let videoUrl =video.videoUrl
    let thumbnailUrl =video.thumbnailUrl
    let UploadBy =user.UserID ||  navigate('/login')
    try {
      await postvidData(
        title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy
      );
      setVideosReqArray(videosreqArray.filter(req => req.VideoID !== VideoID));
      await delvideoreq(title);
    } catch (error) {
      toast.error('Error occurred while processing your request. Please try again later.');
    }
}
  const handleRemoveVideo = async (VideoID) => {
    try {
      await delvideo(VideoID);
      setVideosArray(videosArray.filter(video => video.VideoID !== VideoID));
      fetchgetData();
    } catch (error) {
      toast.error('Failed to remove video. Please try again.');
    }
  };

  const handleRemoveUser = async (Usermail) => {
    try {
      await deluser(Usermail);
      setUsersArray(usersArray.filter(user => user.Usermail !== Usermail));
      fetchgetData();
    } catch (error) {
      toast.error('Failed to remove user. Please try again.');
    }
  };

  const handleAddreqVideo = async (event) => {
    event.preventDefault();
  
    // Retrieve values from form fields
    let title = document.getElementById('title').value.trim();
    let genre = document.getElementById('genre').value.trim();
    const isseries = document.querySelector('input[name="bool_value"]:checked');
    let duration = document.getElementById('duration').value.trim();
    let videoUrl = document.getElementById('vidurl').value.trim();
    let thumbnailUrl = document.getElementById('thumburl').value.trim();
    let UploadBy = user.UserID;
  
    // Basic validation
    if (!title || !genre || !isseries || !duration || !videoUrl || !thumbnailUrl) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
   /* // Optional validation for URL formats
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlPattern.test(videoUrl) || !urlPattern.test(thumbnailUrl)) {
      toast.error('Please enter valid URLs for video and thumbnail.');
      return;
    } 
*/
    const isSeries = isseries.value === 'True';
  
    try {
      await postvidreqData(
        title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy
      );
    } catch (error) {
      toast.error('Error occurred while processing your request. Please try again later.');
    }
  };
  
  const Delvdoreq = async (title,VideoID) => {
    try {
      setVideosReqArray(videosreqArray.filter(req => req.VideoID !== VideoID));
      await delvideoreq(title);
    } catch (error) {
      toast.error('Failed to remove video request. Please try again.');
    }
  };

  const renderTableHeaders = () => {
    if (sidebarval === 2) {
      return (
        <>
          <th className="th" id='col1'>UserName</th>
          <th className="th" id='col2'>Email</th>
          <th className="th" id='col3'>UserId</th>
          <th className="th" id='col4'>Joined At</th>
          <th className="th" id='col5'>Contributions</th>
          <th className="th" id='col6'>Action</th>
        </>
      );
    } else {
      return (
        <>
          <th className="th" id='col1'>Video Title</th>
          <th className="th" id='col2'>isSeries</th>
          <th className="th" id='col3'>Genre</th>
          <th className="th" id='col4'>Uploaded At</th>
          <th className="th" id='col5'>Upload By</th>
          <th className="th" id='col6'>Duration</th>
          <th className="th" id='col7'>VideoID</th>
          <th className="th" id='col8'>Action</th>
        </>
      );
    }
  };

  const renderTableRows = () => {
    if (loading) {
      return (
        <tr className='tr'>
          <td className="td" colSpan="6">Loading data, please wait...</td>
        </tr>
      );
    }

    if (sidebarval === 2) {
      if (usersArray.length === 0) {
        return (
          <tr className='tr'>
            <td className="td" colSpan="6">No data available</td>
          </tr>
        );
      }
      return usersArray.map((us) => (
        <tr className='tr' id="tablerow" key={us.UserID}>
          <td className="td">{us.Username}</td>
          <td className="td">{us.Usermail}</td>
          <td className="td">{us.UserID}</td>
          <td className="td">{new Date(us.createdAt).toLocaleDateString()}</td>
          <td className="td">{us.Contributions}</td>
          <td className="td">
            <button className="rus" onClick={() => handleRemoveUser(us.Usermail)}>Remove</button>
          </td>
        </tr>
      ));
    } else if (sidebarval === 3) {
      if (videosArray.length === 0) {
        return (
          <tr className='tr'>
            <td className="td" colSpan="8">No data available</td>
          </tr>
        );
      }
      return videosArray.map((video) => (
        <tr className='tr' key={video.VideoID}  id="tablerow">
          <td className="td">{video.title}</td>
          <td className="td">{video.isSeries ? 'Yes' : 'No'}</td>
          <td className="td">{video.genre}</td>
          <td className="td">{new Date(video.createdAt).toLocaleDateString()}</td>
          <td className="td">{video.UploadBy}</td>
          <td className="td">{video.duration}</td>
          <td className="td">{video.VideoID}</td>
          <td className="td">
            <button className="rus" onClick={() => handleRemoveVideo(video.VideoID)}>Remove</button>
          </td>
        </tr>
      ));
    } else if (sidebarval === 5) {
      if (videosreqArray.length === 0) {
        return (
          <tr className='tr'>
            <td className="td" colSpan="8">No data available</td>
          </tr>
        );
      }
      return videosreqArray.map((video) => (
        <tr className='tr' id="tablerow" key={video.VideoID}>
          <td className="td">{video.title}</td>
          <td className="td">{video.isSeries ? 'Yes' : 'No'}</td>
          <td className="td">{video.genre}</td>
          <td className="td">{new Date(video.createdAt).toLocaleDateString()}</td>
          <td className="td">{video.UploadBy}</td>
          <td className="td">{video.duration}</td>
          <td className="td">{video.VideoID}</td>
          <td className="td">
          <button className="playb" onClick={()=>playbtnclicked(video)}>Play</button>
            <button className="addb" onClick={() => handleAddVideo(video)}>Add</button>
            <button className="rus" onClick={() => Delvdoreq(video.title,video.VideoID)}>Remove</button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <>
      {sidebarval === 1 ? (
        <div className="profilebox">
          <div className="profile-settings">  
            <form className="profile-form">
            <h2 className="form-title">Your Profile</h2>
              <div className="form-group">
                <label className="form-label">Name</label>
                <h2>{user ? user.Username : "John Doe"}</h2>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <h2>{user ? user.Usermail : "john.doe@example.com"}</h2>
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <h2>{user ? new Date(user.DateofBirth).toLocaleDateString() : "N/A"}</h2>
              </div>
              <div className="form-group">
                <label className="form-label">Contribution</label>
                <h2>{user ? user.Contributions : "25"}</h2>
              </div>
              <div className="form-group">
                <label className="form-label">Profile Created At</label>
                <h2>{user ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</h2>
              </div>
            </form>
            <div className="profile-pic-container">
  <img
    src={user.Profilepic || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"|| navigate('/login')}
    alt="profileimg"
    className="profile-pic"
  />
</div>
          </div>  
        </div> 
      ) : sidebarval === 4 ? (
        <div className="fullmovieform">
          <div className="con">
            <div className="text">Add your Video</div>
            <form className="movieform" onSubmit={handleAddreqVideo}>
              <div className="form-row">
                <div className="input-data">
                  <input id="title" type="text" required />
                  <div className="underline"></div>
                  <label>Title</label>
                </div>
                <div className="input-data">
                  <input id="genre" type="text" required />
                  <div className="underline"></div>
                  <label>Genre</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input id="duration" type="text" required />
                  <div className="underline"></div>
                  <label>Duration</label>
                </div>
            
                <div className="form-row" id="onemark">
                  <input type="radio" id="true" name="bool_value" value="True" />
                  <label htmlFor="true">Series</label><br />
                  <input type="radio" id="false" name="bool_value" value="False" />
                  <label htmlFor="false">Movie</label>
                </div>
                <div className="input-data">
                  <input id="thumburl" type="text" required />
                  <div className="underline"></div>
                  <label>Thumbnail Url</label>
                </div>
                <div className="input-data">
                  <input id="vidurl" type="text" required />
                  <div className="underline"></div>
                  <label>Video Url</label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data textarea">
                  <div className="form-row submit-btn">
                    <div className="input-data">
                      <div className="inner"></div>
                      <input type="submit" value="Submit" />
                      <ToastContainer position="top-right" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="main-content">
          <img src={logimg} className="imgofweb" alt="NUMBER1" />
          <header className="headerofright">
            <h2>Admin Dashboard</h2>
            <div className="user-info">
              <span>{user ? user.Username : "John Doe"}</span>
            </div>
          </header>
          <div className="stats">
            <div className="stat-card green">
              <h3>{counts.movieCount}</h3>
              <p>Movies In DB</p>
            </div>
            <div className="stat-card purple">
              <h3>{counts.seriesCount}</h3>
              <p>Series In DB</p>
            </div>
            <div className="stat-card blue">
              <h3>{counts.userCount}</h3>
              <p>Users</p>
            </div>
            <div className="stat-card orange">
              <h3>{user ? user.Contributions : 0}</h3>
              <p>Your Uploads</p>
            </div>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>{renderTableHeaders()}</tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
          <ToastContainer position="top-right" />
        </div>
      )}
    </>
  );
};

export default Adminright;