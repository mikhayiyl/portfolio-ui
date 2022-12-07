import { useState } from 'react';
import friend from '../services/userService';
import { Btns, Cancel, Friends, FriendsContainer, FriendsRequests, Profile, ProfileImg, ProfileName, Wrapper } from './NavbarStyles'
import { Link } from 'react-router-dom';
import { acceptUser, rejectUser } from '../context/AppContext/ApiCalls';
import logger from '../services/logger';

const FriendsBar = ({ onOpen, state, Dispatch }) => {



    console.count("FRIENDS BAR COMPONENT",);
    return (
        <FriendsContainer>
            <Cancel onClick={onOpen} />
            {state.requests.map(user => <FriendsRequests key={user._id}>
                <Link to={`/profile/${user._id}`} className="link">
                    <Profile>
                        <ProfileImg src={user.profilePicture} alt={user.username} />
                        <ProfileName>{user.username}</ProfileName>
                    </Profile>
                </Link>
                <Btns>
                    <button onClick={() => rejectUser(Dispatch, user._id)} className="btn btn-primary btn-sm m-1">Cancel Request</button>
                    <button onClick={() => acceptUser(Dispatch, user._id)} className="btn btn-primary btn-sm m-1">Accept Request</button>
                </Btns>
            </FriendsRequests>)}
            <Wrapper>
                <h6>Search Friends</h6>
                {state.otherUsers.map(user => <Friend key={user._id} state={state} user={user} Dispatch={Dispatch} onOpen={onOpen} />



                )}







            </Wrapper>
        </FriendsContainer>
    )
}

export default FriendsBar

const Friend = ({ state, user, Dispatch, onOpen }) => {



    const currentuser = state.user;
    const [requestSent, setRequest] = useState(false);
    //friend Request
    const sentRequest = async (user) => {

        try {
            setRequest(true);

            await friend.sentRequest(currentuser._id, user._id);
        } catch (error) {
            setRequest(false);
            logger.log(error);
        }
    }


    const cancelRequest = async (user) => {

        setRequest(false);
        rejectUser(Dispatch, user._id)
    }




    <Friends >
        {user._id !== currentuser._id && <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>

            <Link onClick={onOpen} to={`/profile/${user._id}`} className='link'> <Profile >
                <ProfileImg src={user.profilePicture} alt={user.username} />
                <ProfileName>{user.username}</ProfileName>
            </Profile>
            </Link>
            <Btns>
                {(!currentuser.friends.includes(user._id) && !requestSent) ? <button onClick={() => sentRequest(user)} className="btn btn-primary btn-sm m-1">Add Friend</button> : <button onClick={() => cancelRequest(user)} className="btn btn-secondary btn-sm m-1">Cancel Request</button>}
            </Btns>

        </div>}
    </Friends>

}



