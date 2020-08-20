import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Footer.css';

export default function Footer() {
    return (
        <div id="footer" className="footer">
            <p>Recipe Source: <a href="https://tasty.co/">Tasty</a></p>
            <a href="https://github.com/hkofkin">@hkofkin</a>
        </div>
    )
}