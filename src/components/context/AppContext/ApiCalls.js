import { currentUser } from "../../services/authService";
import { getConversation } from "../../services/chatApi";
import friend from "../../services/userService";
const user = currentUser();

export const currentuser = async (dispatch, token) => {
    dispatch({ type: "API_CALL" });
    try {
        const { data } = await friend.getUser(user._id, token);
        dispatch({ type: "USER_SUCCESS", payload: data });

    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });
    }
}
export const friendRequests = async (dispatch, token) => {
    dispatch({ type: "API_CALL" });
    try {
        const { data } = await friend.getFriendRequests(user._id, token);
        dispatch({ type: "REQUEST_SUCCESS", payload: data });

    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });
    }
}
export const otherUsers = async (dispatch, token) => {
    try {
        if (!user) return;
        dispatch({ type: "API_CALL" });
        const { data } = await friend.otherUsers(user._id, token);
        const users = data.filter(u => !u.friendRequests.includes(user._id))
        dispatch({ type: "OTHER_USERS", payload: users });

    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });
    }
}

export const rejectUser = async (dispatch, id) => {
    dispatch({ type: "API_CALL" });

    try {
        dispatch({ type: "REJECT_USER", payload: id });
        await friend.cancelRequest(user._id, id);

    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });

    }
}

export const acceptUser = async (dispatch, id) => {
    dispatch({ type: "API_CALL" });

    try {
        dispatch({ type: "ACCEPT_USER", payload: id });
        await friend.acceptRequest(user._id, id);

    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });

    }

}
export const allUsers = async (dispatch, token) => {
    dispatch({ type: "API_CALL" });

    try {
        const { data } = await friend.getUsers(token);
        dispatch({ type: "GET_USERS", payload: data });
    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });

    }

}


export const startChat = async (dispatch, id) => {
    dispatch({ type: "API_CALL" });
    try {
        const { data } = await getConversation(user._id, id);
        dispatch({ type: "CURRENT_CHAT", payload: data })
    } catch (error) {
        dispatch({ type: "API_CALL_FAILURE", payload: error });

    }

}
