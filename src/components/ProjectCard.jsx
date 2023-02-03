import { Link } from 'react-router-dom'
import { GitHub, RemoveRedEyeOutlined } from '@mui/icons-material'
import StarIcon from '@mui/icons-material/Star';
import { Rating } from '@mui/material'
const ProjectCard = ({ title, technologies, _id, rating, gitUrl, projectUrl }) => {


    return (
        <div className="card-wrapper">
            <div className="project-card">
                <div className="project-card-top">
                    <img src="assets/images/car.png" alt="" className='project-img' />
                    <h3 className="project-title">{title}</h3>
                </div>
                <div className="project-content">
                    <ul>
                        <h3>Technologies</h3>
                        {technologies.slice(0, 5).map(skill => <li key={skill}>{skill}</li>)}
                    </ul>

                    <div className="rating">
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarIcon style={{ opacity: 0.55, color: "#666" }} fontSize="inherit" />}
                        /></div>

                    <div className="project-links">
                        <Link target={"_blank"} to={`/projects/${_id}`} className='link'>
                            <span> PREVIEW</span> <RemoveRedEyeOutlined />
                        </Link>
                        <Link target={"_blank"} to={{ pathname: "/" + gitUrl }} className='link'>
                            <span> VIEW CODE</span> <GitHub />
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProjectCard