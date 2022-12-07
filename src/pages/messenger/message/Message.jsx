import { format } from 'timeago.js';
import "./style.css"
import { getUser } from '../../../components/services/userService';
import axios from 'axios';
import { useState, useEffect } from 'react';
import logger from '../../../components/services/logger';
const Message = ({ message, own, user, currentChat }) => {

    const [recipient, setRecipient] = useState({});

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const friendId = currentChat.users?.find(member => member !== user._id);

        (async function getUserDetails() {
            try {
                const { data } = await getUser(friendId, { cancelToken: cancelToken.token });
                setRecipient(data);
            } catch (error) {
                logger.log(error);
            }
        }());


        return () => {
            cancelToken.cancel();
        }
    }, [currentChat, user])




    console.count('MESSAGE COMPONENT');
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src={own ? user.profilePicture : recipient.profilePicture} alt={own ? user.username : recipient.username} />
                <p className="messageText">{message?.text} </p>
            </div>
            <time className="time">
                {format(message?.createdAt)}
            </time>

        </div>
    )
}

export default Message