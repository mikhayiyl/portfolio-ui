import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Bio from '../components/Bio';
import Skills from '../components/Skills';
import { motion } from "framer-motion"
const About = ({ toggle, dropIn }) => {
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
            <main className='about-main'>

                <section className="about">
                    <div className="sun"></div>
                    <Bio />
                    <Skills />
                </section>

                <div className="images">
                    <img src="assets/images/tree1.png" alt="tree" className='tree' style={{ "--i": "1" }} />
                    <img src="assets/images/flower.png" alt="flower" className='tree' style={{ "--i": "2" }} />

                    <img src="assets/images/plane.png" alt="plane" className='plane' />

                    <img src="assets/images/city7.png" alt="city" className='mt' style={{ "--i": "1" }} />
                    <img src="assets/images/city6.png" alt="city" className='mt' style={{ "--i": "2" }} />
                    <img src="assets/images/city5.png" alt="city" className='mt' style={{ "--i": "3" }} />
                    <img src="assets/images/city4.png" alt="city" className='mt' style={{ "--i": "4" }} />

                    <div className="car ">
                        <img src="assets/images/car3.png" alt="car" />
                    </div>
                    <div className="car img">
                        <img src="assets/images/car4.png" alt="car" />
                    </div>

                </div>
                <div className="road">
                </div>
                <div className="car bikes">
                    <img src="assets/images/bike.png" alt="bike" />
                </div>

                <div className="car bikes moto">
                    <img src="assets/images/moto.png" alt="moto" />
                </div>
            </main>
            <Footer />
        </motion.div>)
}

export default About