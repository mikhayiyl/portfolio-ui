const UserReducer = (state, action) => {

    switch (action.type) {
        case "API_CALL":
            return {
                ...state,
                isLoading: true
            }
        case "API_CALL_SUCCESS":
            return {
                ...state,
                isLoading: false
            }
        case "API_CALL_FAILURE":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case "USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            };
        case "REQUEST_SUCCESS":
            return {
                ...state,
                isLoading: false,
                requests: action.payload
            };
        case "OTHER_USERS":
            return {
                ...state,
                isLoading: false,
                otherUsers: action.payload
            };
        case "GET_USERS":
            return {
                ...state,
                isLoading: false,
                allusers: action.payload
            };
        case "ONLINE_USERS":
            return {
                ...state,
                isLoading: false,
                onlineusers: action.payload
            };
        case "ONLINE_FRIENDS":
            return {
                ...state,
                isLoading: false,
                onlinefriends: action.payload
            };
        case "REJECT_USER":
            const rejectedUser = state.requests.find(r => r._id === action.payload);
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    friendRequests: state.user.friendRequests.filter(r => r !== action.payload),
                },
                requests: state.requests.filter(r => r._id !== action.payload),
                otherUsers: [...state.otherUsers, rejectedUser]
            };

        case "ACCEPT_USER":
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    friendRequests: state.user.friendRequests.filter(r => r !== action.payload),
                },
                requests: state.requests.filter(r => r._id !== action.payload),
                isfriend: true,
            };


        //dark mode theme
        case "LIGHT":

            localStorage.removeItem("theme");
            return {
                ...state,
                theme: localStorage.getItem("theme")
            }
        case "DARK":
            localStorage.setItem("theme", "dark");
            return {
                ...state,
                theme: localStorage.getItem("theme")
            };

        //chats
        case "CURRENT_CHAT":
            return {
                ...state,
                isLoading: false,
                currentChat: action.payload
            }
        case "SET_SOCKET":
            return {
                ...state,
                socket: action.payload
            }
        case "LIVE_CHATS":
            return {
                ...state,
                livechats: action.payload
            }

        default:
            return state;
    }

}


export default UserReducer;