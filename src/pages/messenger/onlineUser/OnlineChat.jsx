import { startChat } from '../../../components/context/AppContext/ApiCalls';
import config from "../../../config.json"
import "./style.scss"

const OnlineChat = ({ dispatch, onlinefriends }) => {

    const url = config.imageUrl

    return (
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <div className='chatOnline'>
                    {onlinefriends.map(friend =>
                        <div key={friend._id} className="chatOnlineFriend" onClick={() => startChat(dispatch, friend._id)}>
                            <div className="chatOnlineImgContainer m-1">
                                <img className='chatOnlineImg' src={url + friend.profilePicture} alt={friend.name} />
                                <div className="chatOnlineBadge"></div>
                            </div>
                            <span className="chatOnlineName">{friend.username}</span>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default OnlineChat