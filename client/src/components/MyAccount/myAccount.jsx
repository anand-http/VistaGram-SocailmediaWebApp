import React, { useEffect, useState } from 'react';
import './myAccount.css';
import Post from '../Post/post';

import { useDispatch, useSelector } from 'react-redux';
import { getMyPost } from '../../redux/actions/postAction';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import User from '../User/user';
import { userLogout, deleteAccount, UserLoad, clearUserMessage } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { clearMessage } from '../../redux/actions/postAction';
import Loader from '../Loader/loader';
import Logo from '../Logo/logo';

const MyAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const alert = useAlert();

    const [followersBox, setFollowersBox] = useState(false);
    const [followingsBox, setFollowingsBox] = useState(false);


    const { myPostLoading, myPost, likeError, comment, commentError, dltComment, dltCommentError } = useSelector((state) => state.Post)

    const { userLoadData, deleteProfile, deleteProfileError, deleteProfileLoading, logoutError } = useSelector((state) => state.User)

    const posts = myPost?.posts;

    const user = userLoadData?.user;

    const userfollowers = user.followers;
    const userfollowings = user.followings;

    useEffect(() => {
        if (comment) {
            alert.success(comment.message);
            dispatch(clearMessage());

        }
        if (commentError) {
            alert.error(commentError);
            dispatch(clearMessage());
        }

    }, [alert, comment, commentError, dispatch]);


    useEffect(() => {
        if (dltComment) {
            alert.success(dltComment.message);
            dispatch(clearMessage());

        }
        if (dltCommentError) {
            alert.error(dltCommentError);
            dispatch(clearMessage());
        }

    }, [alert, dltComment, dltCommentError, dispatch]);


    useEffect(() => {

        if (likeError) {
            alert.error(likeError);
            dispatch(clearMessage());
        }
    }, [alert, likeError, dispatch]);


    useEffect(() => {
        dispatch(getMyPost());
        dispatch(UserLoad());
    }, [dispatch]);



    const handleLogout = () => {
        dispatch(userLogout());
        navigate('/');
    }


    useEffect(() => {

        if (logoutError) {
            alert.error(logoutError);
            dispatch(clearUserMessage());
        }

    }, [logoutError, alert, dispatch])


    const handleDeleteAccount = () => {
        dispatch(deleteAccount());
    }

    useEffect(() => {

        if (deleteProfileError) {
            alert.error(deleteProfileError);
            dispatch(clearUserMessage());
        }

    }, [deleteProfileError, alert, dispatch])



    return (

        myPostLoading ? <Loader /> :

            <div className='account'>

                <Logo />

                <div className="accountright">

                    <div className="profileLeft">
                        <Avatar src={user.avatar.url} sx={{ height: "10vmax", width: "10vmax", marginBottom: "1vmax" }} />
                        <Typography variant='h5'>{user.name}</Typography>
                    </div>


                    <div className="profileRight">

                        <div className="Linksof">
                            <Link to={'/update/profile'}>Edit Profile</Link>
                            <Link to={'/update/password'}>Change Password</Link>
                            <Button size='small' onClick={handleLogout} variant='contained'>Logout</Button>
                        </div>


                        <div className="postFollowFollwers">
                            <div>
                                <Typography >{user.followings.length} </Typography>
                                <Button disabled={userfollowings.length === 0 ? true : false} onClick={() => setFollowingsBox(!followingsBox)}>  Followings</Button>
                            </div>

                            <div>
                                <Typography >{user.followers.length}</Typography>
                                <Button disabled={userfollowers.length === 0 ? true : false} onClick={() => setFollowersBox(!followersBox)}>Followers</Button>

                            </div>

                            <div>
                                <Typography style={{ marginRight: '5px' }}>{user.posts.length}</Typography>
                                <Typography> Posts</Typography>

                            </div>
                        </div>


                        <div className="ButtonOf">
                            <Button onClick={handleDeleteAccount} variant='text' style={{ color: "red" }}>{deleteProfileLoading ? "Deleting..." : "Delete my Profile"}</Button>
                        </div>

                    </div>



                </div>


                <div className="accountleft">
                    {
                        posts && posts.length > 0 ? posts.map((mypost) => {
                            return (
                                <Post
                                    key={mypost._id}
                                    postId={mypost._id}
                                    postImage={mypost.image.url}
                                    ownerImage={mypost.owner.avatar.url}
                                    ownerId={mypost.owner._id}
                                    ownerName={mypost.owner.name}
                                    caption={mypost.caption}
                                    isAccount={true}
                                    likes={mypost.likes}
                                    comments={mypost.comments}
                                    isDelete={true}
                                />
                            )

                        }) : <h1 style={{ textAlign: "center" }}>Create Post</h1>
                    }

                </div>

                <Dialog open={followersBox} onClose={() => setFollowersBox(!followersBox)}>
                    <div className="DialogBox">
                        <Typography variant='h5'>Followers</Typography>

                        {
                            userfollowers.map((item) => {
                                return (
                                    <User key={item._id} userId={item._id} avatar={item.avatar.url} name={item.name} />
                                )
                            })

                        }

                    </div>
                </Dialog>

                <Dialog open={followingsBox} onClose={() => setFollowingsBox(!followingsBox)}>
                    <div className="DialogBox">
                        <Typography variant='h5'>Followings</Typography>

                        {
                            userfollowings.map((item) => {
                                return (
                                    <User key={item._id} userId={item._id} avatar={item.avatar.url} name={item.name} />
                                )
                            })

                        }

                    </div>
                </Dialog>

            </div>
    )
}

export default MyAccount;