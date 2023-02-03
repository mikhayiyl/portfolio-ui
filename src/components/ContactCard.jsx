import React from 'react'
import { Link } from 'react-router-dom'

const ContactCard = ({ text, icon, title, link }) => {
    return (
        <div className="contact-card-box">
            <div className="contact-card">
                <div className="lines"></div>
                <div className="image-box ">
                    {icon}
                </div>
                <div className="content">
                    <div className="details">
                        <h2>{text}</h2>
                        <p>{title || text}</p>
                        <Link to={link} className='btn btn-primary'>Visit</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
