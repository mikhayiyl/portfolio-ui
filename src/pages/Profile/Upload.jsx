import axios from 'axios';
import React, { useState } from 'react'
import config from "../../config.json"
import { Camera, Cancel } from '@material-ui/icons';
import logger from '../../components/services/logger';
const Upload = ({ user, setIsOpen, openUpload, name, setProfile, profile }) => {
    const [file, setFile] = useState(null);
    const coverPictures = user.images.filter(im => im.type !== 'profile');
    const profilePictures = user.images.filter(im => im.type !== 'cover');

    const handleSubmit = async (e) => {
        const url = "/uploads"
        e.preventDefault();

        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("id", user._id);
            data.append("name", name);

            try {
                await axios.put(url, data)
                window.location.reload();
            } catch (error) {
                logger.log(error);
            }
        }

    }

    const editImage = async (image) => {
        name === "profile" ? setProfile({ ...profile, profilePicture: image }) :
            setProfile({ ...profile, coverPicture: image });
        setIsOpen(false);
        openUpload(false)
        try {
            name === "profile" ?
                await axios.put("/users/" + user._id, { profilePicture: image }) :
                await axios.put("/users/" + user._id, { coverPicture: image });

        } catch (error) {
            logger.log(error);
        }

    }


    return (
        <div className="upload">
            {file && <div className="preview">
                <img src={URL.createObjectURL(file)} className="previevImg" alt="cannotgetimage" />
                <Cancel onClick={() => setFile(null)} className="cancel" />
            </div>}
            <button className="btn btn-success btn-sm button m-1" onClick={() => { setIsOpen(false); openUpload(false) }}>Back</button>
            <div className="upload-top">
                {!file && <label htmlFor="file">
                    <div>
                        <Camera />
                        <span className="btn btn-primary m-1">Upload a new picture</span>
                    </div>
                    <input style={{ display: "none" }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </label>}
                {file && <button className="btn btn-primary" onClick={handleSubmit}>Update {name === "profile" ? "Profile picture" : "cover picture"}</button>}
            </div>
            <div className="upload-images">
                <h2 className="upload-title">Select from uploaded pictures</h2>
                <div className="profile-pics">
                    <h3 className="upload-title">Profile pictures</h3>
                    {profilePictures.map(pic => <img src={config.imageUrl + pic.image} alt={pic.image} key={pic.image} onClick={() => editImage(pic.image)} />)}
                </div>
                <div className="cover-pics">
                    <h3 className="upload-title">Cover pictures</h3>
                    {coverPictures.map(pic => <img src={config.imageUrl + pic.image} alt={pic.image} key={pic.image} onClick={() => editImage(pic.image)} />)}
                </div>

            </div>

        </div>
    )
}

export default Upload