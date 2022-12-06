import http from "./httpService";
const api = "/users";

//register user

export async function registerUser(user) {
  const { headers } = await http.post(api, user);
  localStorage.setItem("token", headers["x-auth-token"]);
}
//all users

export function getUsers(token) {
  return http.get(api, token);
}
//specific user
export function getUser(id, token) {
  return http.get(api + "/" + id, token);
}
//update user
export function updateUser(user) {
  const obj = { ...user }
  delete obj._id
  return http.put(api + "/" + user._id, obj);
}

//all friends
export function getFriends(id, token) {
  return http.get(api + `/friends/${id}`, token);
}
//all following
export function getFollowings(id, token) {
  return http.get(api + `/following/${id}`, token);
}
//all followers
export function getFollowers(id, token) {
  return http.get(api + `/followers/${id}`, token);
}

//all friends requests

export function getFriendRequests(id, token) {
  return http.get(api + `/friendRequests/${id}`, token);
}
//friend request
export function sentRequest(userId, friendId) {
  return http.put(api + `/request/${userId}`, { userId: friendId });
}

//accept Request
export function acceptRequest(id, friendId) {
  return http.put(api + `/friend/${id}`, { userId: friendId });
}
//remove friends
export function unFriendUser(id, friendId) {
  return http.put(api + `/unfriend/${id}`, { userId: friendId });
}

//cancel request
export function cancelRequest(userId, friendId,) {
  return http.put(api + `/cancel/${userId}`, { userId: friendId });
}

// all users who are not friends & have  not sent requests
export function otherUsers(userId, token) {
  return http.get(api + `/verify/${userId}`, token);
}

//follow user
export function followUser(userId, friendId,) {
  return http.put(api + `/follow/${userId}`, { userId: friendId });
}
//unfollow user
export function unFollowUser(userId, friendId,) {
  return http.put(api + `/unfollow/${userId}`, { userId: friendId });
}

const friend = {
  getUser, getUsers, acceptRequest, otherUsers, sentRequest, getFriendRequests, cancelRequest, followUser, unFollowUser, unFriendUser, getFriends
}

export default friend;