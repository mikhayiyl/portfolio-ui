import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import axios from "axios";
import Async from "../middleware/AsyncErrors"
import { getProjects } from '../apiServices/projects';
const Projects = ({ searchQuery }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = Async(async () => {
            const { data } = await getProjects({ cancelToken: cancelToken.token });

            if (searchQuery) {
                const filtered = data.filter(project =>
                    project.genre._id === searchQuery)
                setProjects(filtered);
            } else {

                setProjects(data);
            }
        })


        getData();

        return () => {
            cancelToken.cancel();

        }
    }, [searchQuery])





    return (
        <div className='projects-container'>
            {projects.map(project => <ProjectCard key={project._id} {...project} />)}
        </div>
    )
}

export default Projects




