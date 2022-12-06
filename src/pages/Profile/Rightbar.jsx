import React, { useState } from 'react'
import {
    FollowingImg,
    RightBarFollowing,
    RightBarFollowings,
    RightBarInfo,
    RightBarInfoItem,
    RightBarInfoKey,
    RightBarInfoValue,
    RightBarTitle, RightBarWrapper,
    RightBarFollowingUsername
} from "../../components/RightSideBar/RightBarStyles";

import { Link } from "react-router-dom";
import { RightBarContainer } from './ProfileStyles';
import config from "../../config.json"
import { useEffect } from 'react';


const Rightbar = ({ profile, friends, defaultProfile, user, followings, followers, theme }) => {

    const [coverPictures, setCoverPictures] = useState([]);
    const [profilePictures, setProfilePictures] = useState([])
    useEffect(() => {
        if (!profile.images) return;
        setCoverPictures(profile.images.filter(im => im.type !== 'profile'))
        setProfilePictures(profile.images.filter(im => im.type !== 'cover'))

    }, [profile])



    const url = config.imageUrl;

    return (
        <RightBarContainer className={theme}>
            <RightBarWrapper>
                <RightBarTitle theme={theme} >
                    {profile.username} Bio
                </RightBarTitle>
                <RightBarInfo>
                    <RightBarInfoItem>
                        <RightBarInfoKey theme={theme}>Lives in:</RightBarInfoKey>
                        <RightBarInfoValue>{profile.city}</RightBarInfoValue>
                    </RightBarInfoItem>
                    <RightBarInfoItem>
                        <RightBarInfoKey theme={theme}>From:</RightBarInfoKey>
                        <RightBarInfoValue>{profile.from}</RightBarInfoValue>
                    </RightBarInfoItem>
                    <RightBarInfoItem>
                        <RightBarInfoKey theme={theme}>Relationship:</RightBarInfoKey>
                        <RightBarInfoValue>{profile.relationship === 1 ? "Single" : "In a relationship"}</RightBarInfoValue>
                    </RightBarInfoItem>
                </RightBarInfo>
                {friends.length > 0 && <RightBarTitle theme={theme}>{profile.username} friends <span className="badge  bg-success m-1">{friends.length}</span></RightBarTitle>}
                <RightBarFollowings>
                    <div className="flex">

                        {friends.slice(0, 6).map((friend) => (
                            <Link key={friend._id} to={`/profile/${friend._id}`} className='link'>
                                <RightBarFollowing>
                                    <FollowingImg
                                        src={friend.profilePicture ? url + friend.profilePicture : defaultProfile}
                                        alt={friend.username}
                                        className="profileImg"
                                    />
                                    <RightBarFollowingUsername>{friend.username}</RightBarFollowingUsername>
                                </RightBarFollowing>
                            </Link>

                        ))}
                    </div>
                    <span>
                        {friends.length > 6 && <Link to={`/profile/${user._id}/friends`} className="btn btn-secondary btn-sm m-2 ">See more friends</Link>}
                    </span>
                </RightBarFollowings>
                {followings.length > 0 && <RightBarTitle theme={theme}>{profile.username} followings <span className="badge  bg-success m-1">{followings.length}</span></RightBarTitle>}
                <RightBarFollowings>
                    <div className="flex">

                        {followings.slice(0, 3).map((following) => (
                            <Link key={following._id} to={`/profile/${following._id}`} className='link'>
                                <RightBarFollowing>
                                    <FollowingImg
                                        src={following.profilePicture ? url + following.profilePicture : defaultProfile}
                                        alt={following.username}
                                        className="profileImg"

                                    />
                                    <RightBarFollowingUsername>{following.username}</RightBarFollowingUsername>
                                </RightBarFollowing>
                            </Link>

                        ))}
                    </div>
                    <span>
                        {followings.length > 6 && <Link to={`/profile/${user._id}/followings`} className="btn btn-secondary btn-sm m-2 ">See more followings</Link>}
                    </span>
                </RightBarFollowings>
                {followers.length > 0 && <RightBarTitle theme={theme}>{profile.username} Followers <span className="badge  bg-success m-1">{followers.length}</span></RightBarTitle>}
                <RightBarFollowings>
                    <div className="flex">

                        {followers.slice(0, 6).map((follower) => (
                            <Link key={follower._id} to={`/profile/${follower._id}`} className='link'>
                                <RightBarFollowing>
                                    <FollowingImg
                                        src={follower.profilePicture ? url + follower.profilePicture : defaultProfile}
                                        alt={follower.username}
                                        className="profileImg"

                                    />
                                    <RightBarFollowingUsername>{follower.username}</RightBarFollowingUsername>
                                </RightBarFollowing>
                            </Link>

                        ))}
                    </div>
                    <span>
                        {followers.length > 6 && <Link to={`/profile/${user._id}/followers`} className="btn btn-secondary btn-sm m-2 ">See more followers</Link>}
                    </span>
                </RightBarFollowings>
                <RightBarTitle theme={theme}>{profile.username} Profile Pictures <span className="badge  bg-success m-1">{profilePictures.length}</span></RightBarTitle>
                <RightBarFollowings>
                    <div className="flex">

                        {profilePictures.slice(0, 6).map((pic) => (
                            <Link key={pic.image} to={`/profile/${profile._id}/images`} className='link'>
                                <RightBarFollowing>
                                    <FollowingImg
                                        src={pic.image ? url + pic.image : defaultProfile}
                                        alt={pic.image}
                                        className="profileImg"

                                    />
                                </RightBarFollowing>
                            </Link>

                        ))}
                    </div>
                    <span>
                        {profilePictures.length > 6 && <Link to={`/profile/${user._id}/images`} className="btn btn-secondary btn-sm m-2 ">See more pictures</Link>}
                    </span>
                </RightBarFollowings>
                <RightBarTitle theme={theme}>{profile.username} Cover Pictures <span className="badge  bg-success m-1">{coverPictures.length}</span></RightBarTitle>
                <RightBarFollowings>
                    <div className="flex">

                        {coverPictures.slice(0, 6).map((pic) => (
                            <Link key={pic.image} to={`/profile/${profile._id}/images`} className='link'>
                                <RightBarFollowing>
                                    <FollowingImg
                                        src={pic.image ? url + pic.image : defaultProfile}
                                        alt={pic.image}
                                        className="profileImg"

                                    />
                                </RightBarFollowing>
                            </Link>

                        ))}
                    </div>
                    <span>
                        {coverPictures.length > 6 && <Link to={`/profile/${user._id}/images`} className="btn btn-secondary btn-sm m-2 ">See more pictures</Link>}
                    </span>
                </RightBarFollowings>
            </RightBarWrapper>
        </RightBarContainer>)
}

export default Rightbar