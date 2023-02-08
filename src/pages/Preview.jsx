import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../apiServices/projects';
import Async from "../middleware/AsyncErrors"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Cancel, GitHub, Pages } from '@mui/icons-material';
import { CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


const Preview = ({ dropIn }) => {
    const { id } = useParams();
    const [project, setProject] = useState(null)
    const [viewImage, setImage] = useState('')
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = Async(async () => {
            const { data } = await getProject(id, { cancelToken: cancelToken.token });
            setProject(data);
        })

        getData();

        return () => {
            cancelToken.cancel();

        }
    }, [id]);



    function closeImg() {

        isOpen && setIsOpen(false);
    }


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
                className='projects-main'
            >
                {!project ? <section className="preview"><CircularProgress size="5rem" /></section> : <section className="preview">
                    {isOpen && <div className="bigImg" onClick={() => setIsOpen(false)}
                    >
                        <Cancel className='cancel' />
                        <img src={viewImage} alt={viewImage} />
                    </div>}
                    <div className="preview-container" onClick={() => closeImg()}>
                        <h1>{project.title}</h1>
                        <span className='description'>
                            <p>{project.description}</p>
                        </span>
                        <div className="box">
                            <article className="features">
                                <h2>Features</h2>
                                <ul>
                                    {project.features.map(feature => <li key={feature}>{feature}</li>)}
                                </ul>
                            </article>
                            <article className="skills">
                                <h2>Technologies</h2>
                                <ul>
                                    {project.technologies.map(skill => <li key={skill}>{skill}</li>)}
                                </ul>
                            </article>
                        </div>

                        <div className="pictures">
                            <h2>images</h2>
                            <div className="imgs">
                                {project.images.map(url => <img src={url} alt={url} onClick={() => {
                                    setIsOpen(true);
                                    setImage(url)
                                }} key={url} />)}

                            </div>
                        </div>

                    </div>
                    <div className="buttons">
                        <a target={"_blank"} rel="noreferrer" href={ project.gitUrl} className="btn btn-warning btn-sm m-2">view code
                            <GitHub className='mx-1' />
                        </a>
                        <a target={"_blank"} rel="noreferrer" href={project.projectUrl} className="btn btn-primary btn-sm m-2">view page
                            <Pages className='mx-1' />
                        </a>
                    </div>
                    <Rating
                        name="simple-controlled"
                        value={project.rating}
                        readOnly
                        size="large"
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.4, color: "#fff" }} fontSize="inherit" />}
                    />
                </section>}
            </motion.main>
            <Footer />
        </>

    )
}

export default Preview