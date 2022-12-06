import http from "./httpService";
const commentsApi = "/comments";



//post comments
export function postComments(id) {
    return http.get(commentsApi + "/" + id);
}

//comment post
export function commentPost(comment) {
    return http.post(commentsApi, comment);
}


// delete post comment
export function deleteComment(commentId) {
    return http.delete(commentsApi + `/${commentId}`);
}
// report post comment
export function reportComment(commentId) {
    return http.put(commentsApi + `/${commentId}`);
}


const comment = {
    postComments, commentPost, deleteComment, reportComment
}

export default comment;