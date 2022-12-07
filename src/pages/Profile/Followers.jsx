import { useState } from 'react';
import { Link } from 'react-router-dom';

const Followers = ({ followers, ...rest }) => {

    return (
        <div className='Container'>
            {followers.map(follower => <Follower key={follower._id} follower={follower} {...rest} />)}
        </div>
    )


}




export default Followers






const Follower = ({ follower, followUser, unFollowUser, user, }) => {
    const [open, setOpen] = useState(false)
    const [isFollowed, setIsFollowed] = useState(user.following.includes(follower._id));




    const unFollow = async () => {
        setIsFollowed(false);
        unFollowUser(follower)
    }

    const Follow = async () => {
        setIsFollowed(true);
        followUser(follower)
    }


    console.count("follower");

    return <div className="wrapper">
        <div className="info" onClick={() => setOpen(false)}>
            <Link to={`/profile/${follower._id}`} className="link" >

                <img src={follower.profilePicture} alt={follower.username} className="profileImg" />
                <div>
                    <h6>{follower.username}</h6>
                    <p>{follower.followers.length} followers</p>
                </div>
            </Link>
        </div>
        {follower._id !== user._id ? <span className='list-wrapper'>
            {isFollowed ? <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>Following</button> : <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>Follow</button>}
            {open && <ul className='list-group'>
                {isFollowed ?
                    <li onClick={unFollow}>Unfollow </li>
                    :
                    <li onClick={Follow}>
                        Follow
                    </li>}
            </ul>}
        </span> : <span className="list-wrapper"></span>}
    </div>


}