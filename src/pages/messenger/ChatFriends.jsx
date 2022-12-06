import Conversation from './conversations/Conversation'

const ChatFriends = ({ conversations, setSearchQuery, onlineUsers, dispatch, state }) => {




    return (
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className="chatMenuInput" onChange={e => setSearchQuery(e.currentTarget.value)} />

                {conversations.map(conversation =>
                    <div key={conversation._id} onClick={() => dispatch({ type: "CURRENT_CHAT", payload: conversation })
                    }>
                        <Conversation conversation={conversation} state={state} onlineUsers={onlineUsers} />
                    </div>
                )}
            </div>
        </div>)
}

export default ChatFriends