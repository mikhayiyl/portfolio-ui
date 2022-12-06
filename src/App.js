import Index from './components/Index';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from 'socket.io-client';

import { allUsers, currentuser, friendRequests, otherUsers } from "./components/context/AppContext/ApiCalls";
import AppContext from "./components/context/AppContext/AppContext";
import { useContext } from "react";
import { getFriends } from './components/services/userService';
import logger from './components/services/logger';
import LoadingIndicator from './components/common/LoadingIndicator';
const App = () => {
    const { state, dispatch } = useContext(AppContext);
    const [friends, setFriends] = useState([]);
    const socket = useRef();


    logger.log(state.error)

    //socket
    useEffect(() => {
        socket.current = io("ws://localhost:3900");

        dispatch({ type: "SET_SOCKET", payload: socket.current })

        socket.current.on('GET_TEXT', data => {
            dispatch({
                type: "LIVE_CHATS", payload: {
                    _id: Date.now(),
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                }
            })
        })


    }, [dispatch]);




    //friends
    useEffect(() => {
        if (!state.user) return;
        const cancelToken = axios.CancelToken.source();
        async function populateFriends() {

            try {
                dispatch({ type: "API_CALL" });
                const { data } = await getFriends(state.user._id, { cancelToken: cancelToken.token });
                setFriends(data);
                dispatch({ type: "API_SUCCESS" });
            } catch (error) {
                dispatch({ type: "API_CALL_FAILURE" });
                logger.log(error);
            }
        }
        populateFriends();

        return () => {
            cancelToken.cancel();
        }

    }, [state.user, dispatch]);

    //  online users
    useEffect(() => {
        if (!state.user) return;
        let unsubscribed = false;

        socket.current.emit('ADD_USERID', state.user._id);
        socket.current.on('ONLINE_USERS', users => {
            if (!unsubscribed) {
                dispatch({ type: "ONLINE_USERS", payload: users });
                if (!friends) return;
                const data = friends.filter(friend => users.some(member => member.userId === friend._id))
                dispatch({ type: "ONLINE_FRIENDS", payload: data });

            }
        });
        return () => {
            unsubscribed = true
        }

    }, [state.user, dispatch, friends]);



    useEffect(() => {
        if (!state.jwtUser) return;
        const cancelToken = axios.CancelToken.source();
        currentuser(dispatch, { cancelToken: cancelToken.token })
        allUsers(dispatch, { cancelToken: cancelToken.token });
        friendRequests(dispatch, { cancelToken: cancelToken.token })   //all friend Requests






        return () => {
            cancelToken.cancel();
        }

    }, [dispatch, state.jwtUser])

    //registed Users who have not sent friend requests//people you may know
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        otherUsers(dispatch, { cancelToken: cancelToken.token });


        return () => {
            cancelToken.cancel();
        }

    }, [state.requests, dispatch])





    console.count('APP COMPONENT')
    if ((state.jwtUser && !state.user) || state.isLoading === true) return <LoadingIndicator />
    return (
        <Index state={state} dispatch={dispatch} />
    )
}
export default App;