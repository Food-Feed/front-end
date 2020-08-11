import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Navbar.css';

export default function Navbar() {
    const history = useHistory();
    window.onscroll = function() {navOnScroll()};

    function navOnScroll() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("nav").className = "nav-scrolled";
        } else {
            document.getElementById("nav").className = "nav";
        }
    }

    return (
        <div id="nav" className="nav">
            <a href="/home"><img src="https://res.cloudinary.com/hsk23/image/upload/v1597112868/Food%20Feed/foodfeedlogo_black.001_rjimql.png" alt="food-feed"></img></a>
            <section id="nav-buttons">
                {/* <Link to="/favorites" className="nav-button">Favorites</Link> */}
                <Link to="/recipes" className="nav-button">Recipes</Link>
            </section>
        </div>
    )
}