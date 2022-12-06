import { Comment, CommentBottom, CommentMenu, CommentProfileImg, CommentSidebar, CommentSmall, CommentText, CommentTop, PostSidebarItem, PostSidebarText, PostSidebarWrapper } from './PostStyles'
import config from "../../config.json"
import { format } from 'timeago.js';
import DottedMenu from '../common/DottedMenu';
import { DeleteRounded, LockRounded, Report } from '@material-ui/icons';
import { useState } from 'react';
import comment from '../services/Comments';

const PostComment = ({ text, user, createdAt, likes, spam, replies, _id, onDelete, theme, currentuser }) => {
    const [commentMenu, openCommentMenu] = useState(false);
    const url = config.imageUrl;
    const [spammed, setSpammed] = useState(spam);

    const reportComment = async (id) => {
        setSpammed(true);
        await comment.reportComment(id);

    }

    const verifiedUser = user._id === currentuser._id;

    return (
        <Comment >
            <CommentTop>
                <div style={{
                    display: 'flex', alignItems: "center",

                }}>
                    <CommentProfileImg src={url + user.profilePicture} />
                    <CommentText>{spammed ? <LockRounded /> : text}</CommentText>

                    <CommentMenu onMouseMove={() => openCommentMenu(true)} onMouseLeave={() => openCommentMenu(false)}>
                        <DottedMenu flex theme={theme} />
                        {commentMenu && <CommentSidebar theme={theme} onMouseMove={() => openCommentMenu(true)} onMouseLeave={() => openCommentMenu(false)}>
                            <PostSidebarWrapper>
                                {!verifiedUser && <div>

                                    {!spammed && <PostSidebarItem onClick={() => reportComment(_id)}><Report />
                                        <PostSidebarText>
                                            Report Comment
                                        </PostSidebarText>
                                    </PostSidebarItem>}
                                </div>}
                                {verifiedUser && <PostSidebarItem onClick={() => onDelete(_id)}><DeleteRounded />
                                    <PostSidebarText>
                                        Delete Comment
                                    </PostSidebarText>
                                </PostSidebarItem>}
                            </PostSidebarWrapper>
                        </CommentSidebar>
                        }
                    </CommentMenu>
                </div>
            </CommentTop>
            <CommentBottom>
                <CommentSmall>{likes.length > 0 && likes.length} likes</CommentSmall>
                <CommentSmall>{replies.length > 0 && replies.length} replies</CommentSmall>
                <CommentSmall>{format(createdAt)}</CommentSmall>
            </CommentBottom>
        </Comment>
    )
}

export default PostComment