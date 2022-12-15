import "./style.scss";
import { useState, useEffect } from 'react';
import axios from "axios";
import asyncErrors from "../../../components/middleware/AsyncErrors";
const Conversation = ({ conversation, state }) => {
    const [user, setUser] = useState({});
    const [isOnline, setIsOnline] = useState(true);
    const [unreadTexts, setUnreadTexts] = useState([])


    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const populateTexts = asyncErrors(async () => {
            const { data } = await axios.get(`/messages/unreadchats/${state.user._id}/${conversation._id}`, { cancelToken: cancelToken.token });
            setUnreadTexts(data);

        });
        populateTexts()

        return () => {
            cancelToken.cancel();
        }
    }, [state.user._id, conversation._id])




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
                {/* <img src={user.profilePicture} alt={user.username} className="conversationImg profileImg" /> */}
                <img src="/assets/beach.jpg" alt={user.username} className="conversationImg profileImg" />
                {unreadTexts.length > 0 &&
                    <div className="total-chats">
                        <span className="badge ">
                            {unreadTexts.length}
                        </span>

                    </div>}
                {isOnline && <div className="chatOnlineBadge"></div>}
            </div>
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversation;