import React from 'react';
import Navbar1 from '../components/navbar1';
import '../styles/landingpage.css';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="landpage">
        <Navbar1 />
        <div className="block2">
          <h1 id="fh">Unlimited Movies, Videos, and More</h1>
          <h3 id="fh">Watch Anywhere and Anytime.</h3>
          <h2 id="fh">Ready to watch? Click the Get Started button.</h2>
        </div>
        <div className="landingbtn"> 
          <button 
            onClick={() => navigate('/signup')} 
            className="getstartbtn"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
