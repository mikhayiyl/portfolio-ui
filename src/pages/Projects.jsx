import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import ProjectCards from '../components/Projects';
import Footer from "../components/Footer"
import { motion } from "framer-motion"
import TextLayer from '../components/TextLayer';
import axios from "axios";
import Async from "../middleware/AsyncErrors"




const Projects = ({ dropIn }) => {
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")



    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = Async(async () => {
            const { data } = await axios.get("/genres", { cancelToken: cancelToken.token });
            setGenres(data);
        })

        getData();

        return () => {
            cancelToken.cancel();

        }
    }, [])




    return (
        <>
            <header>
                <Navbar />
            </header>
            <motion.main
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className='projects-main'>

                <ul className="filter-list">
                    <li
                        className='badge bg-success bg-pill m-1'
                        onClick={() => setSearchQuery("")}
                    >ALL PROJECTS</li>
                    {genres.map(genre => <li
                        className='badge bg-secondary bg-pill m-1'
                        key={genre._id}

                        onClick={() => setSearchQuery(genre._id)}
                    >
                        {genre.name}

                    </li>)}

                </ul>
                <div className="filter-bar">
                    <button className="btn btn-secondary btn-sm m-1"
                        onClick={() => setSearchQuery("")}
                    >ALL PROJECTS</button>
                    {genres.map(genre => <button className="btn btn-secondary btn-sm m-1"
                        key={genre._id}

                        onClick={() => setSearchQuery(genre._id)}
                    >
                        {genre.name}

                    </button>)}

                </div>


                <section className="about">
                    <div className="sun"></div>
                    <ProjectCards searchQuery={searchQuery} />
                </section>


                <div className="text-wrapper">
                    <TextLayer />
                </div>
            </motion.main>
            <Footer />
        </>
    )
}

export default Projects