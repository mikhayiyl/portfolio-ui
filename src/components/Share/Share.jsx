import { useState } from "react";
import axios from "axios";
import { EmojiEmotions, Image, LocationOn, Send } from "@material-ui/icons";
import { FaTag } from "react-icons/fa";
import http from "../services/httpService";
import config from "../../config.json"
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

const url = "/uploads"

const Share = ({ name, theme, user }) => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      description,
    };



    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("id", user._id);
      data.append("desc", description);

      try {
        await axios.post(url, data)
        window.location.reload();
      } catch (error) {
        logger.log(error);
      }
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
    <ShareBox className={`container ${theme}`}>
      <BoxWrapper>
        <ShareTop>
          <ShareTopWrapper>
            <Link to={`/profile/${user._id}`} className="link">
              <ProfileImg
                src={config.imageUrl + user.profilePicture}
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
          <CancelImage onClick={() => setFile(null)} />
        </Preview>}
        <ShareBottom onSubmit={handleSubmit}>
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
                <FaTag style={{ color: "blue" }} />
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
        </ShareBottom>
      </BoxWrapper>
    </ShareBox>
  );
};

export default Share;
