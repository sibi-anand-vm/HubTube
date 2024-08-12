import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/navbar2.css';
import logimg from '../assets/num1.png';
import UserContext from "../contexts/Usercontext";

const Navbar2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const logoutbtnclicked = () => {
        logout(); // Call the logout function from context
        navigate("/login"); // Navigate to the login page after logout
    };

    return (
        <header className="header-container">
            <img src={logimg} className="logo-image" alt="NUMBER1" />
            <button className="toggle-button" onClick={toggleNavbar}>
                <span className="toggle-bar"></span>
                <span className="toggle-bar"></span>
                <span className="toggle-bar"></span>
            </button>
            <nav className={`navigation-menu ${isOpen ? "menu-active" : ""}`}>
                <ul className="menu-list">
                    <li className="menu-item"><Link to="/Home">Home</Link></li>
                    <li className="menu-item"><Link to="/Series">Series</Link></li>
                    <li className="menu-item"><Link to="/Movies">Movies</Link></li>
                    <li className="menu-item"><Link to="/Ground">My Ground</Link></li>
                </ul>
            </nav>
            <input
                type="image"
                className="logout-button"
                src="https://static.vecteezy.com/system/resources/previews/000/443/338/non_2x/logout-vector-icon.jpg"
                onClick={logoutbtnclicked}
                name="submit"
                alt="submit"
            />
        </header>
    );
};

export default Navbar2;
