import { readChat } from '../../components/context/AppContext/ApiCalls';
import Conversation from './conversations/Conversation'

const ChatFriends = ({ conversations, setSearchQuery, onlineUsers, dispatch, state }) => {


    const openChat = async (conversation) => {
        dispatch({ type: "CURRENT_CHAT", payload: conversation });
        const senderId = conversation.users.find(member => member !== state.user._id);
        readChat(dispatch, senderId)


    }

    return (
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className="chatMenuInput" onChange={e => setSearchQuery(e.currentTarget.value)} />

                {conversations.map(conversation =>
                    <div key={conversation._id} onClick={() => openChat(conversation)}>
                        <Conversation conversation={conversation} state={state} onlineUsers={onlineUsers} />
                    </div>
                )}
            </div>
        </div>)
}

export default ChatFriends