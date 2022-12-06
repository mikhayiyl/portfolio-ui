import "./style.scss"
import ChatBox from "./ChatBox"
import ChatFriends from "./ChatFriends"
import OnlineChat from "./onlineUser/OnlineChat"
const Messenger = ({ ...rest }) => {
    return (
        <div className="messenger">
            <div className="text-wrapper">
                <ChatFriends {...rest} />
                <ChatBox {...rest} />
            </div>

            <OnlineChat {...rest} />
        </div>)
}

export default Messenger