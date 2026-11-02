import React, { useEffect, useState } from 'react'
import './post.css';
import { Link } from 'react-router-dom';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { likeAndUnlikePost, postOfFollowing, commentAdd, getMyPost, captionUpdate, deletePost, getUserPost } from '../../redux/actions/postAction';
import User from '../User/user';
import CommentCard from '../Comments/comment';
import { UserLoad } from '../../redux/actions/userAction';


const Post = ({ postId, caption, postImage, likes = [], comments = [],
    ownerImage, ownerName, ownerId, isDelete, isAccount, userProfile }) => {

    const [captionUpdateBox, setCaptionUpdateBox] = useState(false);

    const [captionUpdateText, setCaptionUpdateText] = useState(caption)

    const [liked, setLiked] = useState(false);

    const [likesUser, setLikesUser] = useState(false);

    const [commentsToggle, setCommentsToggle] = useState(false);

    const [commentText, setCommentText] = useState("");

    const dispatch = useDispatch();

    const { userLoadData } = useSelector((state) => state.User);

    const loggedinUser = userLoadData?.user;

    const addComment = async (e) => {
        e.preventDefault();

        await dispatch(commentAdd({ commentText, postId }));
        if (isAccount) {
            dispatch(getMyPost());
        }
        else if (userProfile) {
            dispatch(getUserPost(userProfile));
        }
        else {
            dispatch(postOfFollowing());
        }


    }


    const updateCaptionHandle = async (e) => {
        e.preventDefault();
        await dispatch(captionUpdate({ captionUpdateText, postId }));
        if (isAccount) {
            dispatch(getMyPost());
        }
        else if (userProfile) {
            dispatch(getUserPost(userProfile));
        }
        else {
            dispatch(postOfFollowing());
        }

    }


    const handleLike = async () => {
        setLiked(!liked);

        await dispatch(likeAndUnlikePost(postId));

        if (isAccount) {
            dispatch(getMyPost());

        } else if (userProfile) {
            dispatch(getUserPost(userProfile));
        }
        else {
            dispatch(postOfFollowing());

        }
    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === loggedinUser._id) {
                setLiked(true);
            }
        })
    }, [likes, loggedinUser._id]);


    const handleDeletePost = async () => {

        await dispatch(deletePost(postId));
        dispatch(getMyPost());
        dispatch(UserLoad());
    }

    return (
        <div className='post'>
            <div className="postHeader">
                {isAccount ? <Button onClick={() => setCaptionUpdateBox(!captionUpdateBox)}><MoreVert /></Button> : null}
            </div>
            <img src={postImage} alt="post" />

            <div className="postDetails">
                <Avatar src={ownerImage} alt='User' sx={{ height: "3vmax", width: "3vmax" }} />

                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}> {ownerName}</Typography>
                </Link>

                <Typography fontWeight={100} color={"rgba(0,0,0,0.582"} style={{ alignSelf: "center" }} >{caption}</Typography>
            </div>

            <button
                onClick={() => setLikesUser(!likesUser)}
                disabled={likes.length === 0 ? true : false}
                style={{ border: "none", backgroundColor: "white", cursor: "pointer", margin: "1vmax 2vmax" }}><Typography>{`${likes.length} ${likes.length > 1 ? "Likes" : "Like"}`} </Typography></button>

            <div className="postFooter">
                <Button onClick={handleLike} >
                    {
                        liked ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder />
                    }
                </Button>


                <Button onClick={() => setCommentsToggle(!commentsToggle)}>
                    <ChatBubbleOutline />
                </Button>


                <Button onClick={handleDeletePost}>
                    {isDelete ? <DeleteOutline /> : null}
                </Button>
            </div>


            <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
                <div className="DialogBox">
                    <Typography variant='h4'>
                        Liked By
                    </Typography>
                    {
                        likes.map((item) =>
                            <User
                                key={item._id}
                                userId={item._id}
                                avatar={item.avatar.url}
                                name={item.name} />
                        )
                    }
                </div>
            </Dialog>

            <Dialog open={commentsToggle} onClose={() => setCommentsToggle(!commentsToggle)}>
                <div className="DialogBox">
                    <Typography variant='h4'>
                        Comments
                    </Typography>
                    <form className='commentForm' onSubmit={addComment}>
                        <input type="text" required placeholder='Write your comments...' value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                        <Button type='submit' variant='contained'>
                            Add
                        </Button>
                    </form>

                    {
                        comments.length > 0 ? comments.map((item) => {
                            return (
                                <CommentCard key={item.user?._id} userId={item.user?._id} name={item.user?.name}
                                    avatar={item.user?.avatar.url} comment={item.comment}
                                    commentId={item._id} postId={postId} isAccount={isAccount} userProfile={userProfile} />
                            )
                        }) : <Typography>No comments yet</Typography>
                    }
                </div>
            </Dialog>


            <Dialog open={captionUpdateBox} onClose={() => setCaptionUpdateBox(!captionUpdateBox)}>

                <div className="DialogBox">
                    <Typography variant='h5'>Update Caption</Typography>

                    <form className='commentForm' onSubmit={updateCaptionHandle}>
                        <input type="text" required placeholder='Caption...' value={captionUpdateText} onChange={(e) => setCaptionUpdateText(e.target.value)} />
                        <Button type='submit' variant='contained'>
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>


        </div>
    )
}

export default Post