import http from "./httpService";
const api = "/posts";

//all posts
export function getPosts(token) {
  return http.get(api, token);
}
//profile posts + profile friends posts
export function getProfilePosts(userId, token) {
  return http.get(api + `/${userId}/timeline`, token);
}
//post liked
export function likePost(postId, userId) {
  return http.put(api + `/likes/${postId}`, { userId });
}

//post unliked
export function unlikePost(postId, userId) {
  return http.put(api + `/unlikes/${postId}`, { userId });
}
//post shared
export function sharePost(postId, userId) {
  return http.post("/sharepost", { postId, userId });
}
//removed shared post
export function deletesharedPost(postId, userId) {
  return http.delete(`/sharepost/${postId}/${userId}`);
}
//post reported
export function reportPost(postId) {
  return http.put(api + `/report/${postId}`);
}

// post saved
export function savePost(postId, userId) {
  return http.post(`/savepost`, { postId, userId });
}
// saved posts by profile user 
export function getsavedPosts(id) {
  return http.get(`/savepost/${id}`);
}

//savedpost deleted 
export function deleteSavedPost(postId, userId) {

  return http.delete(`/savepost/${postId}/${userId}`);
}

//post deleted 
export function deletePost(id) {
  return http.delete(api + `/${id}`);
}

const postapi = {
  likePost, unlikePost, deletePost, savePost, deleteSavedPost, sharePost, deletesharedPost
}

export default postapi;