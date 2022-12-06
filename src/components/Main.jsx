import styled from "styled-components";
import Feed from './Feed/Feed';
import RightSideBar from './RightSideBar/RightSideBar';
import { reportPost } from './services/PostsService';
import Sidebar from './Sidebar/Sidebar';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import messenger from "./services/chatApi";
import HomeMessenger from "./home-messenger/Home";
import { SidebarContainer } from "./Sidebar/SidebarStyles";
import { RightBarContainer } from "./RightSideBar/RightBarStyles";
import { FeedBox, FeedContainer } from "./Feed/FeedStyles";
import AppContext from "./context/AppContext/AppContext";
import logger from "./services/logger";

const HomeContainer = styled.main`
  width: 100%;
  display: flex;
    
  `


const Main = ({ posts }) => {

    const [open, setIsOpen] = useState(false);
    const [currentChat, setcurrentChat] = useState(null);
    const [friend, setFriend] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { state } = useContext(AppContext);
    const { onlineusers, livechats } = state



    function openChat() {
        setIsOpen(!open)
    }




    useEffect(() => {
        livechats && currentChat?.users.includes(livechats.sender) &&
            setMessages(prev => [...prev, livechats])
    }, [livechats, currentChat]);


    //get messages
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        if (!currentChat) return;
        (async function populateMessages() {
            try {
                const { data } = await messenger.getMessages(currentChat._id, { cancelToken: cancelToken.token });
                setMessages(data);
            } catch (error) {
                logger.log(error);
            }
        }())

        return () => {
            cancelToken.cancel();
        }
    }, [currentChat])


    //send text
    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }


        const receiverId = currentChat.users.find(member => member !== user._id);
        state.socket.emit('SEND_TEXT', {
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


    //report post
    const spamPost = async (postId) => {
        try {
            await reportPost(postId);
            window.location.reload();

        } catch (error) {
            logger.log(error);
        }
    }

    const theme = state.theme;
    const user = state.user;

    console.count('RIGHTSIDEBAR COMPONENT');


    return (
        <HomeContainer >
            {open && <HomeMessenger
                onSubmit={handleSubmit}
                messages={messages}
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                user={user}
                socket={state.socket}
                comingMessage={livechats}
                currentChat={currentChat}
                friend={friend}
                openChat={openChat}
                onlineUsers={onlineusers}
            />}
            <SidebarContainer className={theme}>
                <Sidebar user={user} />
            </SidebarContainer>

            <FeedContainer className={theme}>
                <FeedBox className={theme}>
                    <Feed posts={posts}
                        reportPost={spamPost}
                        feedPath='true' // everyone can post in feed
                        theme={theme}
                        user={user}
                    />
                </FeedBox>
            </FeedContainer>
            <RightBarContainer className={theme}>
                <RightSideBar setcurrentChat={setcurrentChat} setFriend={setFriend}
                    setIsOpen={setIsOpen} user={user} onlineFriends={state.onlinefriends}
                />
            </RightBarContainer>
        </HomeContainer>)
}

export default Main;