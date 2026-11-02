import React, { useState, useEffect } from 'react'
import { Avatar, Typography, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../Post/post';
import { useParams } from 'react-router-dom';
import { getUserPost } from '../../redux/actions/postAction';
import { getUserProfile } from '../../redux/actions/userAction';
import { followAndUnfollow } from '../../redux/actions/userAction';
import Loader from '../Loader/loader';
import { clearMessage } from '../../redux/actions/postAction';
import { useAlert } from 'react-alert';
import Logo from '../Logo/logo';

const UserProfile = () => {
    const params = useParams();
    const userId = params.id
    const dispatch = useDispatch();
    const alert = useAlert();


    const [followersBox, setFollowersBox] = useState(false);
    const [followingsBox, setFollowingsBox] = useState(false);
    const [follow, setFollow] = useState(false);


    const { userPost, userPostLoading, comment, commentError, dltComment, dltCommentError } = useSelector((state) => state.Post)
    const posts = userPost?.posts;


    const { userLoadData, followw, followLoading, data, error } = useSelector((state) => state.User)
    const loggedInUser = userLoadData?.user;
    const user = followw?.user;
    const userfollowers = user?.followers;
    const userfollowings = user?.followings;




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



    const handleFollowUnfollow = async () => {
        await dispatch(followAndUnfollow(userId));
        setFollow(!follow);
        dispatch(getUserProfile(userId));
    }


    useEffect(() => {

        dispatch(getUserPost(userId));
        dispatch(getUserProfile(userId));

    }, [dispatch, userId])

    useEffect(() => {
        if (user) {
            userfollowers.forEach((item) => {
                if (item === loggedInUser._id) {
                    setFollow(true)
                }

            })
        }

    }, [user, loggedInUser._id, userfollowers]);

    return (
        followLoading || userPostLoading ? <Loader /> :

            < div className='account' >
                <Logo />

                <div className="accountright">
                    {
                        user &&
                        <>
                            <div className="profileLeft">
                                <Avatar src={user.avatar.url} sx={{ height: "8vmax", width: "8vmax", marginBottom: "1vmax" }} />
                                <Typography variant='h5'>{user.name}</Typography>
                            </div>

                            <div className="profileRight">

                                <div className="userProfileFollow">
                                    <div>
                                        <Typography>{user.followings.length}</Typography>
                                        <Button disabled={userfollowings.length === 0 ? true : false} onClick={() => setFollowingsBox(!followingsBox)}>Followings</Button>

                                    </div>

                                    <div>
                                        <Typography>{user.followers.length}</Typography>
                                        <Button disabled={userfollowers.length === 0 ? true : false} onClick={() => setFollowersBox(!followersBox)}>Followers</Button>

                                    </div>

                                    <div>
                                        <Typography>{user.posts.length}</Typography>
                                        <Button>Posts</Button>

                                    </div>

                                </div>

                                <Button size='small' style={{ marginTop: "1vmax" }} onClick={handleFollowUnfollow} variant='contained'>{follow ? "Unfollow" : "Follow"}</Button>
                            </div>
                        </>
                    }
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
                                    likes={mypost.likes}
                                    comments={mypost.comments}
                                    userProfile={userId}
                                />
                            )

                        }) : <Typography>No Post to show</Typography>
                    }

                </div>



            </div >

    )
}

export default UserProfile