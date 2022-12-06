import { SendRounded } from '@material-ui/icons';
import React, { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import Message from '../../pages/messenger/message/Message';
import config from "../../config.json"
import { Link } from 'react-router-dom';

const HomeMessenger = ({ messages, newMessage, setNewMessage, onSubmit, user, currentChat, socket, comingMessage, friend, openChat, onlineUsers }) => {
    const [typing, setTyping] = useState('');
    const [isOnline, setIsOnline] = useState(false);


    const scrollRef = useRef();
    //scroll effect
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth", block: "nearest", inline: "start" })
        scrollRef.current?.focus({ preventScroll: true })

    }, [messages])



    //typing status

    useEffect(() => {
        if (newMessage.length > 0) {
            socket?.emit('TYPING_STATUS', { typingStatus: user.username + " typing..." });
        } else {
            socket?.emit('TYPING_STATUS', { typingStatus: " " });
        }
        socket?.on('status', status => {
            setTyping(status.typingStatus);
        });
    }, [newMessage, comingMessage, user, socket])


    useEffect(() => {
        setIsOnline(onlineUsers.some(member => member.userId === friend._id));
    }, [onlineUsers, friend])




    return (
        <div className="home-messenger">
            <div className="messenger-top">
                <Link to={`/profile/${friend._id}`} className='link'>
                    <div className="imgContainer">
                        <img src={config.imageUrl + friend.profilePicture} alt={friend.username} className="profileImg" />
                        {isOnline && <div className="chatOnlineBadge"></div>}
                    </div>
                    <span className="messenger-info">
                        <h6 className="messenger-name">{friend.username}</h6>
                        <p className="text">{isOnline ? "online..." : "Offline"}</ p>
                    </span>
                    <FaTimes className="close-message" onClick={openChat} />

                </Link>
            </div>

            <div className='messenger-centre'>
                <p className='typing'>{typing.typingStatus}</p>
                {messages.map(message =>
                    <div key={message?._id} className='sms' ref={scrollRef}>
                        <Message message={message} own={message?.sender === user._id} user={user} currentChat={currentChat} />
                    </div>
                )}
            </div>
            <div className="text-area">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="start conversation..." className='form-control m-1'></input>
                <SendRounded
                    className="send"
                    onClick={onSubmit} />
            </div>


        </div>



    )
}

export default HomeMessenger