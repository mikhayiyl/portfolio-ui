import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import Contact from '../pages/Contact';
import Message from './Message';

import { AnimatePresence } from "framer-motion";
import Preview from '../pages/Preview'
const AnimatedRoutes = ({ toggle }) => {
  const location = useLocation();
  const dropIn = {

    hidden: {
      x: -100,
      opacity: 0,
    },

    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 15,
        stiffness: 500
      }
    },

    exit: {
      x: 100,
      opacity: 0.1,
      transition: {
        duration: 0
      }
    }
  }


  return (
    <AnimatePresence >
      <Routes location={location} key={location.pathname} >
        <Route path="/" exact element={<Home toggle={toggle} dropIn={dropIn} />} />
        <Route path="/about" element={<About toggle={toggle} dropIn={dropIn} />} />
        <Route path="/projects" element={<Projects toggle={toggle} dropIn={dropIn} />} />
        <Route path="/projects/:id" element={<Preview toggle={toggle} dropIn={dropIn} />} />
        <Route path="/contact" element={<Contact toggle={toggle} dropIn={dropIn} />} />
        <Route path="/message" element={<Message toggle={toggle} dropIn={dropIn} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes