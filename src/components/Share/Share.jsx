import { useState } from "react";
import axios from "axios";
import { EmojiEmotions, Image, LocationOn, Send } from "@material-ui/icons";
import { FaTag } from "react-icons/fa";
import http from "../services/httpService";
import {
  CancelImage,
  Preview,
  PreviewImage,
  PreviewVideo,
  ShareBottom,
  ShareBox,
  ShareHr,
  ShareOption,
  ShareOptions,
  ProfileImg,
  ShareText,
  ShareTop,
  BoxWrapper,
  ShareTopWrapper,
} from "./ShareStyles";
import { Link } from "react-router-dom";
import logger from "../services/logger";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../common/Firebase";
import LinearDeterminate from "../common/LinearProgress";

const url = "/uploads"

const Share = ({ name, theme, user }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      description,
    };



    if (file) {
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
          setProgress(Math.round(progress));
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
            await axios.post(url, { userId: user._id, file: downloadURL, description, name: file.name, })
          }).then(() => window.location.reload()
          ).catch(ex => logger.log(ex))
        }
      );
    }


    if (!file && description) {


      try {
        await http.post("/posts", newPost)
        window.location.reload();
      } catch (error) {
        logger.log(error);
      }
    }
  }


  return (
    <ShareBox className={`container ${theme}`} >
      {progress && <span className='progress-bar'>
        <LinearDeterminate progress={progress} />
      </span>}
      <BoxWrapper>
        <ShareTop>
          <ShareTopWrapper>
            <Link to={`/profile/${user._id}`} className="link">
              <ProfileImg
                src={user.profilePicture}
                alt={user.username}
                className="shareProfileImg"
              />
            </Link>
          </ShareTopWrapper>
          <input
            style={{ width: '90%' }}
            type="text"
            placeholder={`What's on your mind , ${name ? name : user.username} ?`}
            className="form-control m-2"
            onChange={e => setDescription(e.target.value)}
          />{(description && !file) && <Send style={{ color: `${theme ? " #fff" : "blue"}`, fontSize: "2rem" }} onClick={handleSubmit} />}
        </ShareTop>
        <ShareHr />
        {file && <Preview>
          {file.name.endsWith(".mp4") ?
            <PreviewVideo controls src={URL.createObjectURL(file)} /> :
            <PreviewImage src={URL.createObjectURL(file)} />}
          {!progress && <CancelImage onClick={() => setFile(null)} />}
        </Preview>}
        {!progress && <ShareBottom onSubmit={handleSubmit}>
          <ShareOptions>
            {!file && <ShareOption htmlFor="file">
              <div className="icons-cover">
                <Image style={{ color: "tomato" }} />
              </div>
              <ShareText className="shareOptionText">Photo/video</ShareText>
              <input style={{ display: "none" }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </ShareOption>
            }
            {file && <ShareOption>
              <div className="icons-cover">
                <FaTag style={{ color: "lightblue" }} />
              </div>
              <ShareText >Tag</ShareText>
            </ShareOption>}
            <ShareOption>
              <div className="icons-cover">
                <LocationOn style={{ color: "green" }} />
              </div>
              <ShareText >Location</ShareText>
            </ShareOption>
            <ShareOption>
              <div className="icons-cover">
                <EmojiEmotions style={{ color: `${theme ? " #ff652f" : "purple"}` }} />
              </div>
              <ShareText>Feeling</ShareText>
            </ShareOption>
          </ShareOptions>
          {file && <button className="btn btn-info " type="submit">Post</button>}
        </ShareBottom>}
      </BoxWrapper>
    </ShareBox>
  );
};

export default Share;
