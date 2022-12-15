import axios from "axios";
import asyncErrors from "../../middleware/AsyncErrors";
import { currentUser } from "../../services/authService";
import { getConversation } from "../../services/chatApi";
import friend from "../../services/userService";
const user = currentUser();

export const currentuser = asyncErrors(async (dispatch, token) => {
    dispatch({ type: "API_CALL" });
    const { data } = await friend.getUser(user._id, token);
    dispatch({ type: "USER_SUCCESS", payload: data });
})
export const friendRequests = asyncErrors(async (dispatch, token) => {
    dispatch({ type: "API_CALL" });
    const { data } = await friend.getFriendRequests(user._id, token);
    dispatch({ type: "REQUEST_SUCCESS", payload: data });
})
export const otherUsers = asyncErrors(async (dispatch, token) => {
    if (!user) return;
    dispatch({ type: "API_CALL" });
    const { data } = await friend.otherUsers(user._id, token);
    const users = data.filter(u => !u.friendRequests.includes(user._id))
    dispatch({ type: "OTHER_USERS", payload: users });
})

export const rejectUser = asyncErrors(async (dispatch, id) => {
    dispatch({ type: "API_CALL" });
    dispatch({ type: "REJECT_USER", payload: id });
    await friend.cancelRequest(user._id, id);
    dispatch({ type: "API_CALL_SUCCESS" });
})

export const acceptUser = asyncErrors(async (dispatch, id) => {
    dispatch({ type: "API_CALL" });
    dispatch({ type: "ACCEPT_USER", payload: id });
    await friend.acceptRequest(user._id, id);
    dispatch({ type: "API_CALL_SUCCESS" });
})
export const allUsers = asyncErrors(async (dispatch, token) => {
    dispatch({ type: "API_CALL" });
    const { data } = await friend.getUsers(token);
    dispatch({ type: "GET_USERS", payload: data });
})


export const startChat = asyncErrors(async (dispatch, id) => {
    dispatch({ type: "API_CALL" });
    const { data } = await getConversation(user._id, id);
    dispatch({ type: "CURRENT_CHAT", payload: data })
})

export const readChat = asyncErrors(async (dispatch, senderId) => {
    dispatch({ type: "API_CALL" });
    await axios.put(`/messages/read/${user._id}`, { senderId })
    dispatch({ type: "API_CALL_SUCCESS" });

})