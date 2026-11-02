import React, { useEffect } from 'react'
import './home.css';
import Post from '../Post/post';
import User from '../User/user'
import { useDispatch, useSelector } from 'react-redux';
import { postOfFollowing } from '../../redux/actions/postAction';
import { getAllUser } from '../../redux/actions/userAction';
import { useAlert } from 'react-alert';
import { clearMessage } from '../../redux/actions/postAction';
import Loader from '../Loader/loader';
import Logo from '../Logo/logo';

const Home = () => {
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.Post);

  const posts = post?.posts;


  const { getAllUserData, getAllUserLoading } = useSelector((state) => state.User);

  const users = getAllUserData?.users;



  const { likeError } = useSelector((state) => state.Post);

  const { comment, commentError } = useSelector((state) => state.Post);
  const { dltComment, dltCommentError } = useSelector((state) => state.Post);

  const alert = useAlert();

  useEffect(() => {
    if (likeError) {
      alert.error(likeError);
      dispatch(clearMessage());
    }
  }, [alert, likeError, dispatch]);


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
    dispatch(postOfFollowing());
    dispatch(getAllUser());

  }, [dispatch])


  return (
    isLoading || getAllUserLoading ? <Loader /> :
      <div className='home'>
        <Logo/>
        <div className="homeright">
          {
            users && users.length > 0 ?
              users.map((item) => {
                return (

                  <User
                    key={item._id}
                    userId={item._id}
                    avatar={item.avatar.url}
                    name={item.name} />

                )
              }) : <h1>No User to Follow</h1>
          }
        </div>

        <div className="homeleft">
          {
            posts && posts.length > 0 ?
              posts.map((item) => {
                return (
                  <Post
                    key={item._id}
                    postId={item._id}
                    postImage={item.image.url}
                    ownerImage={item.owner.avatar.url}
                    ownerId={item.owner._id}
                    ownerName={item.owner.name}
                    caption={item.caption}
                    isAccount={false}
                    likes={item.likes}
                    comments={item.comments}
                  />
                )
              })
              : <h1 style={{ textAlign: "center" }}>Follow User to see thier Post</h1>
          }




        </div>




      </div>
  )
}

export default Home