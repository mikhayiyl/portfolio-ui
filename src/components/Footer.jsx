import { Facebook, GitHub, Instagram, Twitter } from '@mui/icons-material';


import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="social-icons">
                <Link to="https://www.facebook.com/profile.php?id=100088898800957">
                    <Facebook />
                </Link>
                <Link to="https://twitter.com/Devine14Michael">
                    <Twitter />
                </Link>
                <Link to="/">
                    <Instagram />
                </Link>
                <Link to="https://github.com/mikhayiyl">
                    <GitHub />
                </Link>
            </div>
            <span>Mikhayiyl &copy; copyright {new Date().getFullYear()} All Rights
                Reserved</span>
        </footer>
    )
}

export default Footer