import { useState } from 'react';
import { Link } from 'react-router-dom';


const Followings = ({ followings, ...rest }) => {

    return (
        <div className='Container'>
            {followings.map(following => <Following {...rest} following={following} key={following._id} />)}
        </div>
    )


}




export default Followings






const Following = ({ following, unFollowUser, followUser, user }) => {
    const [open, setOpen] = useState(false)
    const [isFollowed, setIsFollowed] = useState(user.following.includes(following._id));



    const unFollow = async () => {
        setIsFollowed(false);
        unFollowUser(following)

    }

    const Follow = async () => {
        setIsFollowed(true);
        followUser(following)
    }



    return <div className="wrapper">
        <div className="info" onClick={() => setOpen(false)}>
            <Link to={`/profile/${following._id}`} className="link" >

                <img src={following.profilePicture} className="profileImg" alt={following.username} />
                <div>
                    <h6>{following.username}</h6>
                    <p>{following.following.length} followings</p>
                </div>
            </Link>
        </div>
        {following._id !== user._id ? <span className='list-wrapper'>
            {isFollowed ? <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>Following</button> : <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>Follow</button>}
            {open && <ul className='list-group'>
                {isFollowed ?
                    <li onClick={unFollow}>Unfollow </li>
                    :
                    <li onClick={Follow}>
                        Follow
                    </li>}
            </ul>}
        </span> : <span className='list-wrapper'></span>}
    </div>

}
