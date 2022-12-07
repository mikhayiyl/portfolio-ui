import axios from 'axios';
import React, { useState } from 'react'
import { Camera, Cancel } from '@material-ui/icons';
import logger from '../../components/services/logger';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../components/common/Firebase"

const Upload = ({ user, setIsOpen, openUpload, name, setProfile, profile }) => {
    const [file, setFile] = useState(null);
    const coverPictures = user.images.filter(im => im.type !== 'profile');
    const profilePictures = user.images.filter(im => im.type !== 'cover');

    const handleSubmit = async (e) => {
        const url = "/uploads"
        e.preventDefault();



        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);



        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:

                }
            },
            (error) => {
                // Handle unsuccessful uploads
                logger.log(error)
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await axios.put(url, { userId: user._id, file: downloadURL, name })
                }).then(() => window.location.reload()).catch(ex => logger.log(ex))
            }
        );
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
                    {profilePictures.map(pic => <img src={pic.image} alt={pic.image} key={pic.image} onClick={() => editImage(pic.image)} />)}
                </div>
                <div className="cover-pics">
                    <h3 className="upload-title">Cover pictures</h3>
                    {coverPictures.map(pic => <img src={pic.image} alt={pic.image} key={pic.image} onClick={() => editImage(pic.image)} />)}
                </div>

            </div>

        </div>
    )
}

export default Upload