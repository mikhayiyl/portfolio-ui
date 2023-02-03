import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactCard from '../components/ContactCard';
import { Email, Facebook, GitHub, LocationOn, PhoneAndroid, Twitter } from '@mui/icons-material';
import TextLayer from '../components/TextLayer';
import { motion } from "framer-motion";
import Background from '../common/Background';

const Contact = ({ toggle, dropIn }) => {
    const icons = [
        { _id: 1, icon: <Email className='icon' />, text: "Email", title: "duhnycan@gmail.com", link: "link" },
        { _id: 2, icon: <Facebook className='icon' />, text: "Facebook", title: "mikhayiyl pro", link: "link" },
        { _id: 3, icon: <Twitter className='icon' />, text: 'Twitter', title: "Space mikhayiyl", link: "link" },
        { _id: 4, icon: <GitHub className='icon' />, text: 'GitHub', title: "mikhayiyl", link: "link" },
        { _id: 5, icon: <PhoneAndroid className='icon' />, text: 'Phone', title: "+254 742 769200", link: "/contact" },
        {
            _id: 6, icon: <LocationOn className="icon" />, text: 'Address', title: "Po.Box.1215-90100", link: "/contact"
        },
    ]



    return (
        <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <header>
                <Navbar toggle={toggle} />
            </header>
            <main className="contact-main">
                <div className="contacts" >
                    <div className="section-title">
                        <div className="text-wrapper">
                            <TextLayer />
                        </div>
                    </div>
                    <div className="contact-items">
                        {icons.map(icon =>
                            <ContactCard
                                key={icon._id}
                                {...icon}
                                className='tw'
                            />
                        )}
                    </div>
                </div>
                <Background />
            </main>
            <Footer />
        </motion.div>
    )
}

export default Contact