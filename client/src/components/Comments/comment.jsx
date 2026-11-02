import React from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { commentDelete, getMyPost, getUserPost } from '../../redux/actions/postAction';
import { postOfFollowing } from '../../redux/actions/postAction';

const CommentCard = ({ userId, name, avatar, comment, commentId, postId, isAccount, userProfile }) => {
    const dispatch = useDispatch();

    const { userLoadData } = useSelector((state) => state.User);
    const user = userLoadData?.user;

    const deleteCommentHandle = async () => {
        await dispatch(commentDelete({ postId, commentId }));
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
    return (
        <div className='commentUser'>
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
            </Link>

            <Typography>
                {comment}
            </Typography>

            {
                isAccount ?
                    <Button onClick={deleteCommentHandle}>  <Delete /></Button> : userId === user._id ? <Button onClick={deleteCommentHandle}>  <Delete /></Button> : null

            }



        </div>
    )
}

export default CommentCard;