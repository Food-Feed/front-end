import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Navbar.css';

export default function Navbar(props) {
    const history = useHistory();
    window.onscroll = function() {navOnScroll()};

    function navOnScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("nav").className = "nav-scrolled";
        } else {
            document.getElementById("nav").className = "nav";
        }
    }

    const handleLoginClick = () => {
        history.push(`/login`);
    };

    const handleSignupClick = () => {
        history.push(`/signup`);
    };

    return (
        <div id="" className="">
            <a href="/"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597112868/Food%20Feed/foodfeedlogo_black.001_rjimql.png" alt="food-feed"></img></a>
            <br/>
            <Link to="/login" className="nav-button" onClick={handleLoginClick}>Log In</Link>
            <Link to="/signup" className="nav-button" onClick={handleSignupClick}>Sign Up</Link>
            {/* <button className="nav-buttons" onClick={() => props.handleNavSwitch("signUp")}>Sign Up</button>
            <button className="nav-buttons" onClick={() => props.handleNavSwitch("login")}>Log In</button> */}
        </div>
    )
}