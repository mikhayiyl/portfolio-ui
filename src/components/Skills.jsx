import React, { useEffect, useState } from 'react'
import { getSkills } from '../apiServices/skills';
import Async from "../middleware/AsyncErrors";
import axios from "axios"
import { CircularProgress } from '@mui/material';
const Skills = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const getData = Async(async () => {
            const { data } = await getSkills({ cancelToken: cancelToken.token });
            setData(data);
        })

        getData();

        return () => {
            cancelToken.cancel();

        }
    }, [])




    if (!data) return <div className="skills-container"><CircularProgress size="5rem" /></div>
    return (
        <div className="skills-container">
            {data.map(item => <Skill {...item} key={item._id} />
            )}
        </div>
    )
}

export default Skills;


const Skill = ({ percent, title, skills }) => {
    return (
        <div className="skill-wrapper">

            <div className="skills-item">
                <div className="shadow">
                    <div className="content">
                        <Item percent={percent} title={title} skills={skills} />
                    </div>
                </div>
            </div>
        </div>
    )
}




const Item = ({ percent, title, skills }) => {
    return (
        <div className="battery">
            <div className="battery-content">
                <h3>{title}</h3>
                <div className="batteryShape">
                    <div className="level">
                        <div className="percentage" style={{ width: `${percent}%` }}></div>
                    </div>
                </div>
                <div className="percent">{percent}%</div>
            </div>

            <div className="description">
                <h3>{title}</h3>

                <ul>
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                    <li>lorem</li>
                </ul>
            </div>
        </div>
    )
}

