import { useRef, useState, useEffect } from 'react';
import comment from '../services/Comments';
import logger from '../services/logger';
import PostComment from './PostComment';
import { CommentsContainer, SendIcon, TextInputWrapper, CommentsWrapper } from './PostStyles'


const PostComments = ({ id, comments, setComments, onDelete, spam, theme, currentuser }) => {
    const [newComment, setNewComment] = useState('');
    const scrollRef = useRef();

    //post comment
    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentPost = {
            userId: currentuser._id,
            postId: id,
            text: newComment,
            createdAt: Date.now()
        }

        try {
            const { data } = await comment.commentPost(commentPost);
            setComments([...comments, data]);
            setNewComment("");
        } catch (error) {
            logger.log(error);
        }
    }
    const handleKey = e => {
        if (newComment.length > 0 && e.key === "Enter") {
            handleSubmit(e)
        }
    }

    //scroll effect
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth", block: "nearest", inline: "start" })

    }, [comments])

    return (
        <CommentsContainer theme={theme}>

            <CommentsWrapper spam={spam} theme={theme}>
                {comments?.map(comment => <div key={comment._id} ref={scrollRef}>
                    <PostComment {...comment} onDelete={onDelete} currentuser={currentuser} theme={theme} />
                </div>)}
            </CommentsWrapper>
            {!spam && <TextInputWrapper>
                <textarea className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='comment this post...'
                    onKeyDown={e => handleKey(e)}
                ></textarea>
                {newComment && <SendIcon onClick={handleSubmit} className="m-2 icons" theme={theme} />}
            </TextInputWrapper>}
        </CommentsContainer>
    )
}
export default PostComments;