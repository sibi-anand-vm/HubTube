import React from "react";
import {  useNavigate } from "react-router-dom";
import '../styles/navbar4.css';
import logimg from '../assets/num1.png';

const Navbar4 = () => {
    const navigate = useNavigate();
    const logoutbtnclicks = () => { // Call the logout function from context
        navigate("/Home"); // Navigate to the login page after logout
    };

    return (
        <header className="head-container">
            <img src={logimg} className="logo-image" alt="NUMBER1" />
            <input
                type="image"
                className="logout-button"
                src="https://static.vecteezy.com/system/resources/previews/000/443/338/non_2x/logout-vector-icon.jpg"
                onClick={logoutbtnclicks}
                name="submit"
                alt="submit"
            />
        </header>
    );
};

export default Navbar4;
