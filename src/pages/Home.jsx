import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextLayer from '../components/TextLayer';
import { motion } from 'framer-motion';
import { Cloud } from '@mui/icons-material';

const Home = ({ toggle, dropIn }) => {
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
            <main>
                <div className="scene">
                    <div className="sun"></div>
                    <div className="van">
                        <img src="assets/images/car.png" alt="car" />

                    </div>
                    <div className="car">
                        <img src="assets/images/bus1.png" alt="bus" />
                    </div>


                    <Cloud className='cloud' style={{ "--i": "1" }} />
                    <Cloud className='cloud' style={{ "--i": "2" }} />
                    <Cloud className='cloud' style={{ "--i": "3" }} />

                    <img src="assets/images/tree1.png" alt="tree" className='tree' style={{ "--i": "2" }} />
                    <img src="assets/images/tree2.png" alt="tree" className='tree' style={{ "--i": "3" }} />
                    <img src="assets/images/tree.png" alt="tree" className='tree' style={{ "--i": "1" }} />
                    <img src="assets/images/flower.png" alt="flower" className='tree' style={{ "--i": "4" }} />

                    <img src="assets/images/mt1.png" alt="mountain" className='mt' style={{ "--i": "1" }} />
                    <img src="assets/images/house1.png" alt="house" className='mt mt2' style={{ "--i": "2" }} />
                    <img src="assets/images/house4.png" alt="house" className='mt mt2' style={{ "--i": "3" }} />
                    <div className="road"></div>

                    <div className="text">
                        <TextLayer />
                    </div>


                </div>
            </main>

            <Footer />
        </motion.div>
    )
}

export default Home