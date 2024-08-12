import React, { useState } from 'react';
import logimg from '../assets/num1.png';
import '../styles/navbar1.css';
import { useNavigate} from 'react-router-dom';
const Navbar1 = () => {
    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState('Sign In');
    const handleClick = () => {
        if (buttonText === 'Sign In') {
            navigate('/login');
          setButtonText('Sign Up');
        } else {
            navigate('/signup');
          setButtonText('Sign In');
        }
      };
  return (
    <div className="navbar1">
      <img className="img1" src={logimg} alt="Number 1" />
      <button className="signinbtn" onClick={handleClick} type="button">
    {buttonText}
      </button>
    </div>
  );
};

export default Navbar1;
