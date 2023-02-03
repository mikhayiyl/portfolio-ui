import { ChatBubble } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
const Navbar = ({ toggle }) => {
    const [open, setIsOpen] = useState(false);
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };
    useEffect(() => {

        window.addEventListener("scroll", changeNav);
        return () => window.removeEventListener("scroll", changeNav);
    }, []);

    return (
        <>
            <div className="menu-button" onClick={() => setIsOpen(!open)}>
                <div className={open ? "menu-button-burger open" : "menu-button-burger"}></div>
            </div>
            <nav className={open ? "open navbar" : "navbar"} style={{ background: `${scrollNav ? "#00000098" : "transparent"}`, backdropFilter: `${scrollNav ? "blur(10px)" : ""}` }}>
                <ul className={open ? "open" : ""}>
                    <li className={open ? "open" : ""} ><Button link="/" child="Home" /> </li>
                    <li className={open ? "open" : ""} ><Button link="/about" child="About" /> </li>
                    <li className={open ? "open" : ""} ><Button link="/projects" child="Projects" /> </li>
                    <li className={open ? "open" : ""} ><Button link="/contact" child="Contact" /> </li>
                    <li className={open ? "open" : ""} onClick={() => setIsOpen(false)}><Link to="#!" onClick={() => toggle()}> <ChatBubble /></Link></li>
                </ul>
            </nav>

        </>

    )
}

export default Navbar