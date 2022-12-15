import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "../../components/Header"
import Messenger from './Messenger';
import messenger from '../../components/services/chatApi';
import logger from '../../components/services/logger';
import asyncErrors from '../../components/middleware/AsyncErrors';


const Index = ({ state, dispatch }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typing, setTyping] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const { user, currentChat, onlinefriends, socket, livechats, } = state;


    //typing status

    useEffect(() => {
        let unsubscribed = false;
        if (newMessage.length > 0) {
            socket?.emit('TYPING_STATUS', { typingStatus: user.username + " typing..." });
        } else {
            socket?.emit('TYPING_STATUS', { typingStatus: "" });
        }
        socket?.on('status', status => {
            if (!unsubscribed) {
                setTyping(status.typingStatus);
            }
        });




        return () => {
            unsubscribed = true
        }
    }, [newMessage, livechats, user, socket])




    useEffect(() => {
        livechats && currentChat?.users.includes(livechats.sender) &&
            setMessages(prev => [...prev, livechats])
    }, [livechats, currentChat]);


    //get conversations
    useEffect(() => {

        const filteruser = state.allusers.find(user => user.username.startsWith(searchQuery.toLowerCase()))
        const cancelToken = axios.CancelToken.source();
        const populateConversations = asyncErrors(async () => {
            const { data } = await messenger.getConversations(user._id, { cancelToken: cancelToken.token });
            const filtered = data.filter(c => c.users.includes(filteruser._id)

            )
            setConversations((filteruser && searchQuery) ? filtered : data);
        })

        populateConversations()


        return () => {
            cancelToken.cancel();
        }
    }, [user, searchQuery, state.allusers])


    //get messages
    useEffect(() => {
        if (!currentChat) return;
        const cancelToken = axios.CancelToken.source();
        const populateMessages = asyncErrors(async () => {
            const { data } = await messenger.getMessages(currentChat._id, { cancelToken: cancelToken.token });
            setMessages(data);

        })
        populateMessages()

        return () => {
            cancelToken.cancel();
        }
    }, [currentChat])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const receiverId = currentChat.users.find(member => member !== user._id);

        const message = {
            sender: user._id,
            recipient: receiverId,
            text: newMessage,
            conversationId: currentChat._id
        };




        socket.emit('SEND_TEXT', {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })


        try {
            const { data } = await messenger.createMessage(message);
            setMessages([...messages, data]);
            setNewMessage('');

        } catch (error) {
            logger.log(error);
        }
    }


    //mark texts as read if chat is already open
    useEffect(() => {
        if (currentChat) {
            const friendId = currentChat.users.find(member => member !== user._id);
            (async function readText() {
                await axios.put(`/messages/read/${user._id}`, { senderId: friendId })
            }())
        }


    }, [currentChat, livechats, user._id])








    console.count('MESSAGER COMPONENT');
    if (!user) return <p>loading chats...</p>
    return (
        <>
            <Header />
            <Messenger
                conversations={conversations}
                user={user}
                dispatch={dispatch}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSubmit={handleSubmit}
                currentChat={currentChat}
                typing={typing}
                setSearchQuery={setSearchQuery}
                onlineUsers={state.onlineusers}
                state={state}
                onlinefriends={onlinefriends} />

        </>


    )
}

export default Index;