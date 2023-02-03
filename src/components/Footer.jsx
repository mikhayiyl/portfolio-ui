import { Facebook, GitHub, Instagram, Twitter } from '@mui/icons-material';


import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="social-icons">
                <Link to="/">
                    <Facebook />
                </Link>
                <Link to="/">
                    <Twitter />
                </Link>
                <Link to="/">
                    <Instagram />
                </Link>
                <Link to="/">
                    <GitHub />
                </Link>
            </div>
            <span>Mikhayiyl &copy; copyright {new Date().getFullYear()} All Rights
                Reserved</span>
        </footer>
    )
}

export default Footer