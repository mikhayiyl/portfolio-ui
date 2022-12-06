import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { DeleteForever, Report, Save, Share, ThumbDown } from "@material-ui/icons"
import { FaHeart, FaLock } from "react-icons/fa";
import config from "../../config.json"
import {
  PostContainer,
  PostWrapper,
  PostTop,
  PostCenter,
  PostTopLeft,
  PostTopRight,
  ProfileUsername,
  PostDate,
  PostText,
  PostImage,
  PostBottom,
  PostBottomLeft,
  PostBottomRight,
  CommentHeader,
  LikeCounter,
  PostVideo,
  PostSidebar,
  PostSidebarWrapper,
  PostSidebarItem,
  PostSidebarText,
  SpammedPost,
  SpamText,
} from "./PostStyles";
import { format } from "timeago.js"
import { getUser } from "../services/userService";
import postapi from "../services/PostsService";
import axios from "axios";
import PostComments from "./PostComments";
import comment from "../services/Comments";
import DottedMenu from "../common/DottedMenu";
import { Link, useLocation } from "react-router-dom";
import logger from "../services/logger";
const Post = ({ post, reportPost, theme, currentuser }) => {
  const { _id, userId, description, media, likes, createdAt, spam } = post

  const admin = currentuser === userId;

  const [postLikes, setLikes] = useState(likes.length);
  const [user, setUser] = useState([]);
  const [liked, setLiked] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const location = useLocation().pathname.split("/")[1];
  const path = location === "/savedposts";
  const path1 = location === "profile";


  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getData = async () => {
      try {
        const { data: user } = await getUser(userId, { cancelToken: cancelToken.token });
        setUser(user);
      } catch (error) {
        logger.log(error);
      };
    }

    getData();

    return () => {
      cancelToken.cancel();
    }

  }, [userId]);


  useEffect(() => {
    function checkDbLike() {
      setLiked(() => {
        return likes.find((like) => like === currentuser._id);
      });
    }
    checkDbLike();
  }, [likes, currentuser._id])


  useEffect(() => {
    let unsubscribed = false;

    async function populateComments() {
      if (!unsubscribed) {
        try {
          const { data } = await comment.postComments(_id);
          setComments(data);
        } catch (error) {
          logger.log(error);
        }

      }
    }
    populateComments();




    return () => {
      unsubscribed = true
    }



  }, [_id])


  //delete comment

  const deleteComment = async (id) => {
    try {
      setComments(comments.filter(comment => comment._id !== id));
      await comment.deleteComment(id);
    } catch (error) {
      setComments(comments);
      logger.log(error);
    }
  }

  //savePost
  const savePost = async () => {
    setOpenSidebar(false);
    try {
      await postapi.savePost(_id, currentuser._id);
      toast.info("Post saved successfully");

    } catch (error) {
      if (error && error.response.status === 400) {
        toast.warn("Post Already Saved");
      }
      logger.log(error);
    }
  }



  const handleLike = async () => {
    if (liked) {
      setLikes(postLikes - 1);
      setLiked(false);
      try {
        await postapi.unlikePost(_id, currentuser._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.warn("The Post is already deleted");
        } else {
          toast.warn("something failed");
          logger.log(error);
        }
      }
    } else if (!liked) {
      setLiked(true);
      setLikes(postLikes + 1);

      try {
        await postapi.likePost(_id, currentuser._id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.warn("The Post is already deleted");
        } else {
          toast.warn("something failed");
          logger.log(error);
        }
      }
    }
  };

  //delete post 
  const handleDelete = async (id) => {

    try {
      if (admin) {
        await postapi.deletePost(id);

      } else {
        await postapi.deleteSavedPost(id, currentuser._id);
      }

      window.location.reload();
    } catch (error) {
      logger.log(error);
    }
  }
  //delete shared post 
  const removeSharedPost = async (id) => {

    try {

      await postapi.deletesharedPost(id, currentuser._id);

      window.location.reload();
    } catch (error) {
      logger.log(error);
    }
  }

  //share post 
  const sharePost = async (post) => {
    try {
      await postapi.sharePost(_id, currentuser._id);
      toast.success("post shared successfully");
    } catch (error) {
      toast.error(error.response.data);
      logger.log(error);
    }
  }


  console.count('postComponent');
  const url = config.imageUrl;
  return (
    <PostContainer className={theme} >
      {openSidebar && <PostSidebar theme={theme}>
        <PostSidebarWrapper>
          {(!path && !admin) && <PostSidebarItem onClick={savePost}><Save />
            <PostSidebarText>
              Save Post
            </PostSidebarText>
          </PostSidebarItem>}
          {(!path && !admin) && <PostSidebarItem onClick={() => reportPost(_id)}><Report />
            <PostSidebarText>
              Report this Post
            </PostSidebarText>
          </PostSidebarItem>}
          {!admin && <PostSidebarItem onClick={sharePost}><Share />
            <PostSidebarText>
              Share Post
            </PostSidebarText>
          </PostSidebarItem>}
          {admin && <PostSidebarItem onClick={() => handleDelete(_id)}><DeleteForever />
            <PostSidebarText>
              Delete Post
            </PostSidebarText>
          </PostSidebarItem>}
          {path && <PostSidebarItem onClick={() => handleDelete(_id)}><DeleteForever />
            <PostSidebarText>
              Remove this post
            </PostSidebarText>
          </PostSidebarItem>}
          {(path1 && !admin) && <PostSidebarItem onClick={() => removeSharedPost(_id)}><DeleteForever />
            <PostSidebarText>
              Remove this post
            </PostSidebarText>
          </PostSidebarItem>}
        </PostSidebarWrapper>
      </PostSidebar>
      }
      <PostWrapper>
        <PostTop>
          <PostTopLeft>
            <Link to={`/profile/${user._id}`} className='link'>
              <img
                className="profileImg"
                src={url + user.profilePicture}
                alt={user.username}
              />
              <ProfileUsername>{user.username}</ProfileUsername>
            </Link>
            <PostDate>{format(createdAt)}</PostDate>
          </PostTopLeft>
          <PostTopRight onClick={() => setOpenSidebar(!openSidebar)}>
            <DottedMenu theme={theme} />
          </PostTopRight>
        </PostTop>
        <PostCenter onClick={() => setOpenSidebar(false)}>

          <PostText>{description}</PostText>
          {spam ? <SpammedPost><FaLock /><SpamText>This media is reported to be nuisance</SpamText></SpammedPost> :
            <div>

              {media.name === "video" ? (
                <PostVideo src={url + media.filename} controls></PostVideo>
              ) : (
                <PostImage src={url + media.filename} alt={media.name} />
              )}
            </div>}
        </PostCenter>
        <PostBottom onClick={() => setOpenSidebar(false)}>
          <PostBottomLeft>
            <div className="icons-cover">

              <ThumbDown onClick={handleLike}
                style={{ color: "orangered", fontSize: "20px", cursor: "pointer" }} />
            </div>

            <div className="icons-cover m-1">

              <FaHeart onClick={handleLike} style={{
                color: "red",
                margin: "10px",
                fontSize: "20px",
                cursor: "pointer",
              }} />
            </div>
            <LikeCounter>
              {postLikes > 0 ? postLikes : null}
            </LikeCounter>
          </PostBottomLeft>
          <PostBottomRight>
            <CommentHeader theme={theme} onClick={() => setOpenComment(!openComment)}>{comments?.length > 0 && comments?.length} comments</CommentHeader>
          </PostBottomRight>
        </PostBottom>
        {openComment && <PostComments currentuser={currentuser} theme={theme} id={_id} onClick={() => setOpenSidebar(!openSidebar)} comments={comments} setComments={setComments} onDelete={deleteComment} spam={spam} />}
      </PostWrapper>

    </PostContainer>
  );
};

export default Post;
