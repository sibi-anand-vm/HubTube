// Signup.js

import React, { useRef, useState } from 'react';
import '../styles/Signup.css';
import Navbar1 from '../components/navbar1';
import { postSignupData } from '../services/apiService'; // Named import
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const dobRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const profilePicRef = useRef(null);
  const [profilePicBase64, setProfilePicBase64] = useState('');
  const [profilePicName, setProfilePicName] = useState('Add Profile Pic');

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicBase64(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Username = usernameRef.current.value;
    const Usermail = emailRef.current.value;
    const DateofBirth = dobRef.current.value;
    const Password = passwordRef.current.value;
    const ConfirmPassword = confirmPasswordRef.current.value;

    if (!Username) {
      toast.warning('Username is required');
      return;
    }
    if (!Usermail) {
      toast.warning('Email is required');
      return;
    }
    if (!DateofBirth) {
      toast.warning('Date of Birth is required');
      return;
    }
    if (!Password) {
      toast.warning('Password is required');
      return;
    }
    if (Password !== ConfirmPassword) {
      toast.warning('Passwords do not match');
      return;
    }

    let Profilepic = profilePicBase64;

    try {
      await postSignupData(
        Username,
        Usermail,
        DateofBirth,
        Password,
        Profilepic,
        navigate
      );
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <>
      <div className='signuppage'>
        <Navbar1 />
        <div className="block12">
          <h1>Sign Up</h1>
          <form className="signup" onSubmit={handleSubmit}>
            <input
              className="signupinbox"
              id="Username"
              type="text"
              ref={usernameRef}
              placeholder="Name"
            />
            <input
              className="signupinbox"
              id="Usermail"
              type="email"
              ref={emailRef}
              placeholder="Email"
            />
            <input
              className="dobbox"
              type="date"
              id="Userdob"
              ref={dobRef}
              placeholder="Date of Birth"
            />
            <input
              className="signupinbox"
              id="Password"
              type="password"
              ref={passwordRef}
              placeholder="Password"
            />
            <input
              className="signupinbox"
              id="CPassword"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm Password"
            />
            <label htmlFor="ProfilePic" className="profilepiclabel">
              {profilePicName}
            </label>
            <input
              className="profilepicbox"
              id="ProfilePic"
              type="file"
              ref={profilePicRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
            <button type="submit" className="regbtn">Register</button>
            <ToastContainer position="top-right" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
