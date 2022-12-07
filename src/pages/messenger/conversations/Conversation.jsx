import "./style.scss";
import { useState, useEffect } from 'react';
const Conversation = ({ conversation, state }) => {
    const [user, setUser] = useState({});
    const [isOnline, setIsOnline] = useState(true);



    //conversation friend details
    useEffect(() => {
        const friendId = conversation.users?.find(user => user !== state.user._id);
        const data = state.allusers.find(user => user._id === friendId);
        setUser(data);



    }, [conversation, state.user, state.allusers])

    //verify if user online
    useEffect(() => {
        setIsOnline(state.onlineusers.some(member => member.userId === user._id));
    }, [state.onlineusers, user])




    return (
        <div className="conversation">
            <div className="image-Box">
                <img src={user.profilePicture} alt={user.username} className="conversationImg profileImg" />
                {isOnline && <div className="chatOnlineBadge"></div>}
            </div>
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversation;