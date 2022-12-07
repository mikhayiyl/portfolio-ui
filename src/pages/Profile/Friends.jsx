import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Friends = ({ friends, ...rest }) => {


    return (
        <div className='Container'>
            {friends.map(friend => <Friend {...rest} friend={friend} key={friend._id} />)}
        </div>
    )


}




export default Friends






const Friend = ({ friend, unFriendUser, user, sentRequest, cancelRequest, state }) => {
    const [open, setOpen] = useState(false);
    const [isFriend, setIsFriend] = useState(user.friends.includes(friend._id));
    const [requestSend, setSend] = useState(friend.friendRequests.includes(user._id));

    const isfriend = state.isfriend


    function setIs_Friend() {
        setIsFriend(true)
    }

    useEffect(() => {
        if (isfriend) setIs_Friend();
    }, [isfriend])


    const unFriend = async () => {
        setIsFriend(false);
        unFriendUser(friend._id);

    }

    const addFriend = async () => {
        setSend(true)
        sentRequest(friend._id)
    }
    const cancelRequests = async () => {
        setSend(false)
        cancelRequest(friend._id)
    }



    return <div className="wrapper">
        <div className="info" onClick={() => setOpen(false)}>
            <Link to={`/profile/${friend._id}`} className="link" >

                <img src={friend.profilePicture} className="profileImg" alt={friend.username} />
                <div>
                    <h6>{friend.username}</h6>
                    <p>{friend.friends.length} friends</p>
                </div>
            </Link>
        </div>
        {friend._id !== user._id ? <span className='list-wrapper'>
            {isFriend ? <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>Friends</button> :
                <button className="btn btn-secondary btn-sm" onClick={() => setOpen(!open)}>
                    {requestSend ? "Cancel Request" : "Add Friend"}

                </button>}
            {open &&
                <aside onClick={() => setOpen(!open)}>
                    {
                        requestSend ? <ul className='list-group' >
                            <li onClick={cancelRequests}>Cancel Request</li>
                        </ul> : <ul className='list-group'>

                            <li>
                                <Link to={`/profile/${friend._id}/friends`} className='link'>
                                    See Friends List
                                </Link>
                            </li>
                            {isFriend ? <li onClick={unFriend}>Unfriend</li> : <li onClick={addFriend}>Add Friend</li>}
                        </ul>
                    }
                </aside>}

        </span> : <span className='list-wrapper'></span>}
    </div>

}
