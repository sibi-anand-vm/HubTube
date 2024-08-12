import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import '../styles/adminleft.css';
import UserContext from "../contexts/Usercontext";

const Adminleft = ({ sidebarval, setsidebarval }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [role, setRole] = useState("User Member");

  useEffect(() => {
    if (user.Usermail === process.env.REACT_APP_Adminmail) {
      setRole("Admin Member");
    } else {
      setRole("User Member");
    }
  }, [user.Usermail]);

  // Function to render sidebar based on user email
  const rendersidebarval = () => {
    if (user.Usermail === process.env.REACT_APP_Adminmail) {
      return (
        <>
          <li><a className={sidebarval === 1 ? "active" : ""} onClick={() => setsidebarval(1)}>User Profile</a></li>
          <li><a className={sidebarval === 2 ? "active" : ""} onClick={() => setsidebarval(2)}>Users</a></li>
          <li><a className={sidebarval === 3 ? "active" : ""} onClick={() => setsidebarval(3)}>Videos</a></li>
          <li><a className={sidebarval === 4 ? "active" : ""} onClick={() => setsidebarval(4)}>Add Videos</a></li>
          <li><a className={sidebarval === 5 ? "active" : ""} onClick={() => setsidebarval(5)}>Video Request</a></li>
        </>
      );
    } else {
      return (
        <>
          <li><a className={sidebarval === 1 ? "active" : ""} onClick={() => setsidebarval(1)}>User Profile</a></li>
          <li><a className={sidebarval === 4 ? "active" : ""} onClick={() => setsidebarval(4)}>Add Videos</a></li>
        </>
      );
    }
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={user.Profilepic || "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"} alt="Profile" onError={() => navigate('/login')} />
        <h3>{user.Username}</h3>
        <p>{role}</p>
      </div> 
      <nav className="dash">
        <ul>
          {rendersidebarval()}
        </ul>
      </nav>
      <button className="quick-send" onClick={() => navigate('/Home')}>Go Back</button>
    </div>
  );
};

export default Adminleft;
