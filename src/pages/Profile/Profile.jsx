import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import "./style.scss"
import { getProfilePosts } from "../../components/services/PostsService";
import friend, { getFollowers, getFollowings } from "../../components/services/userService";
import { ProfileContainer, ProfileCover, ProfileCoverpageImage, ProfileTop, ProfileRightWrapper, ProfileUserDescription, ProfileUserImage, ProfileUserInfo, ProfileUsername, ProfileList, ProfileFriends, ProfileListItem, CameraIcon, ProfileUserImageBox, CoverImageBox } from "./ProfileStyles";
import { Add, CancelSharp, Chat, Remove } from "@material-ui/icons";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import ProfileBottom from "./ProfileBottom";
import axios from "axios";
import { acceptUser, rejectUser, startChat } from "../../components/context/AppContext/ApiCalls";
import Upload from "./Upload";
import logger from "../../components/services/logger";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import asyncErrors from "../../components/middleware/AsyncErrors";



const Profile = ({ state, dispatch }) => {

  const user = state.user;
  const theme = state.theme;
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followed, setIsFollowed] = useState(user.following.includes(id));
  const location = useLocation().pathname.split("/")[1];
  const profileLocation = useLocation().pathname.split("/")[2];
  const profilePath = (location === "profile" && profileLocation === user._id);
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [open, setIsOpen] = useState(false);
  const [upload, openUpload] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("");
  const userFriendRequests = state.user.friendRequests;


  const isfriend = state.isfriend


  function setIs_Friend() {
    setIsFriend(true)
  }

  useEffect(() => {
    let sub = false;


    if (!sub) {


      if (isfriend) setIs_Friend();
    }

    return () => {
      sub = true
    }


  }, [isfriend])


  const sentRequest = async (ID) => {
    try {
      setIsLoading(true);
      if (id === ID) setFriendRequests([...friendRequests, user._id]);
      await friend.sentRequest(user._id, ID);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      logger.log(error);
    }
  }

  const cancelRequest = (Id) => {
    setFriendRequests(friendRequests.filter(r => r !== user._id))
    rejectUser(dispatch, Id)
  }


  const acceptRequest = (Id) => {
    setIsFriend(true);
    acceptUser(dispatch, Id)
  }

  const unFriendUser = async (ID) => {
    try {
      setIsLoading(true);
      if (user._id === id) setFriends(friends.filter(fr => fr._id !== ID));
      setIsFriend(false);
      await friend.unFriendUser(user._id, ID);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      logger.log(error);
    }
  }



  //profile user 
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async function getProfileUser() {
      try {
        setIsLoading(true);
        const { data } = await friend.getUser(id, { cancelToken: cancelToken.token })
        setProfile(data);
        setFriendRequests(data.friendRequests)
        setIsFollowed(data.followers.includes(user._id));
        setIsFriend(data.friends.includes(user._id))
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        logger.log(error);
      }

    }())


    return () => {
      cancelToken.cancel();
    }
  }, [id, user._id])

  //profile posts
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    const getPosts = asyncErrors(async () => {
      const { data } = await getProfilePosts(id, { cancelToken: cancelToken.token });
      setPosts(data)
      setIsLoading(false);
    })
    getPosts();

    return () => {
      setIsLoading(false);
      cancelToken.cancel();
    }

  }, [id]);


  //profile friends
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const getProfileUserFriends = asyncErrors(async () => {
      if (!id) return;

      const { data } = await friend.getFriends(id, { cancelToken: cancelToken.token });
      setFriends(data)
      setIsLoading(false);

    });
    getProfileUserFriends();

    return () => {
      setIsLoading(false);
      cancelToken.cancel();
    }

  }, [id]);





  useEffect(() => {
    const cancelToken = axios.CancelToken.source();



    // followings and followers
    const getProfileFollowings = asyncErrors(async () => {
      setIsLoading(true);
      const { data } = await getFollowings(id, { cancelToken: cancelToken.token });
      setFollowings(data);
      setIsLoading(false);
    })
    getProfileFollowings();


    const getProfileFollowers = asyncErrors(async () => {
      setIsLoading(true);
      const { data } = await getFollowers(id, { cancelToken: cancelToken.token });
      setFollowers(data)
      setIsLoading(false);

    })


    getProfileFollowers();

    return () => {
      cancelToken.cancel();
    }

  }, [id]);




  const handleFollow = async () => {
    setIsFollowed(!followed);
    try {
      setIsLoading(true);
      if (followed) {
        await friend.unFollowUser(user._id, id);
      } else {
        await friend.followUser(user._id, id);
      }
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setIsFollowed(followed);
      logger.log(error);
    }

  }



  const unFollowUser = async (follower) => {
    try {
      setIsLoading(true);
      if (user._id === id) setFollowings(followings.filter(f => f._id !== follower._id));
      user.following = user.following.filter(f => f !== follower._id);
      await friend.unFollowUser(user._id, follower._id);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setFollowings(followings)
      logger.log(error);
    }
  }

  const followUser = async (follower) => {
    try {
      setIsLoading(true)
      if (user._id === id) setFollowings([...followings, follower]);
      user.following.push(follower._id);

      await friend.followUser(user._id, follower._id);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setFriends(followers)
      logger.log(error);
    }
  }






  console.count("PROFILE COMPONENT");


  if (isLoading) return <LoadingIndicator />;
  if (!user) return <Navigate to='/home' />
  return (
    <>
      <Header />
      <ProfileContainer className={theme}>
        {open && <div style={{ width: '100%', height: "100vh", background: "#222", position: "absolute", zIndex: "99" }}>
          {upload && <Upload user={user} name={type} setProfile={setProfile} profile={profile} setIsOpen={setIsOpen} openUpload={openUpload} dispatch={dispatch}
          />}

        </div>}


        <ProfileRightWrapper>
          <ProfileTop>
            <ProfileCover>
              {id !== user._id && <span style={{ position: "absolute", bottom: "0", margin: '0 1rem' }}>
                <Link to="/messenger" className="btn btn-success btn-sm m-1" onClick={() => startChat(dispatch, id)}>
                  Chat <Chat />
                </Link>
                {(!isFriend && !friendRequests.includes(user._id) && !userFriendRequests.includes(id)) && <button className="btn btn-warning btn-sm m-1" onClick={() => sentRequest(id)} >
                  ADD FRIEND <Add />
                </button>}

                {friendRequests.includes(user._id) &&
                  <button className="btn btn-warning m-2 btn-sm m-1" onClick={() => cancelRequest(id)} >
                    CANCEL REQUEST <Remove />
                  </button>}

                {isFriend && <button className="btn btn-secondary btn-sm m-1" onClick={() => setToggle(!toggle)}  >FRIENDS</button>}

                {userFriendRequests.includes(id) && <button className="btn btn-primary btn-sm m-1" onClick={() => setToggle(!toggle)} >ACCEPT REQUEST <Add /></button>}

                {toggle && <ul className='list-group ' onClick={() => setToggle(false)} >

                  {isFriend && <li className="bg-warning" onClick={() => unFriendUser(id)}>
                    Unfriend <Remove />
                  </li>}
                  {!isFriend && <li onClick={() => acceptRequest(id)} className="bg-info">
                    Accept <Add />
                  </li>}
                  {!isFriend && <li className="bg-danger" onClick={() => cancelRequest(id)} >
                    Reject <CancelSharp />
                  </li>}
                </ul>}
              </span>
              }


              {id !== user._id && <button onClick={handleFollow} style={{ position: "absolute", bottom: "0", right: '0' }} className="btn btn-primary btn-sm m-1">
                {followed ? "UNFOLLOW" : "FOLLOW"}
                {followed ? <Remove /> : <Add />}
              </button>}
              <CoverImageBox>

                <ProfileCoverpageImage
                  src={profile.coverPicture}
                  alt={profile.username}
                />

                {id === user._id && <CameraIcon className="profileCameraIcon" onClick={() => { setIsOpen(true); openUpload(true); setType("cover") }} />}

              </CoverImageBox>
              <ProfileUserImageBox>
                <ProfileUserImage
                  src={profile.profilePicture}
                  alt={profile.username}
                />
                {id === user._id && <CameraIcon onClick={() => { setIsOpen(true); openUpload(true); setType("profile") }} />}
              </ProfileUserImageBox>
            </ProfileCover>
            <ProfileUserInfo>
              <ProfileUsername>{profile.username}</ProfileUsername>
              <ProfileUserDescription>{profile.description}</ProfileUserDescription>
            </ProfileUserInfo>
            <ProfileFriends>
              <span>
                {friends.length} friends
              </span>
              {friends.slice(0, 6).map(friend => <div key={friend._id}>
                <img src={friend.profilePicture} alt={friend.profilePicture} className="profileImg" />
              </div>)}

            </ProfileFriends>
            <ProfileList>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/about`} className="link">About</NavLink>
              </ProfileListItem>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/posts`} className="link" >Posts</NavLink>
              </ProfileListItem>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/friends`} className="link" >Friends
                  <span className="badge  bg-success m-1">{friends.length}</span>
                </NavLink>
              </ProfileListItem>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/images`} className="link" >Images</NavLink>
              </ProfileListItem>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/followings`} className="link" >
                  Followings <span className="badge  bg-info m-1">{followings.length}</span>
                </NavLink>
              </ProfileListItem>
              <ProfileListItem>
                <NavLink to={`/profile/${id}/followers`} className="link" >Followers
                  <span className="badge  bg-secondary m-1">{followers.length}</span>
                </NavLink>
              </ProfileListItem>
            </ProfileList>
          </ProfileTop>

          <div className={theme} >
            <ProfileBottom path="posts"
              theme={theme}
              friends={friends}
              user={user}
              posts={posts}
              name={profile.username}
              profilePath={profilePath}
              profile={profile}
              followers={followers}
              sentRequest={sentRequest}
              followings={followings}
              unFriendUser={unFriendUser}
              unFollowUser={unFollowUser}
              followUser={followUser}
              state={state}
              dispatch={dispatch}
              cancelRequest={cancelRequest}
            />
          </div>
        </ProfileRightWrapper>
      </ProfileContainer>
      <Footer />
    </>
  );
};
export default Profile;
