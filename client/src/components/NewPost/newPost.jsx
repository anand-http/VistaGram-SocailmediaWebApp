import React, { useEffect, useState } from 'react';
import './newPost.css';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPost, uploadPost } from '../../redux/actions/postAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UserLoad } from '../../redux/actions/userAction';
import { clearMessage } from '../../redux/actions/postAction';
import Logo from '../Logo/logo';

const NewPost = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const alert = useAlert();

    const { newPostLoading, newPostError, newPost } = useSelector((state) => state.Post);

    const dispatch = useDispatch();

    const handleImage = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }

    }


    useEffect(() => {
        if (newPostError) {
            alert.error(newPostError);
            dispatch(clearMessage());
        }
        if (newPost) {
            alert.success(newPost.message);
            dispatch(clearMessage());
        }

    }, [alert, newPostError, newPost,dispatch])

    const addPost = async (e) => {
        e.preventDefault();
        await dispatch(uploadPost({ caption, image }));
        dispatch(getMyPost());
        dispatch(UserLoad());
        navigate('/account');
    }

    return (
        <div className='newPost'>
            <Logo/>
            <form className='newPostForm' onSubmit={addPost}>
                {image && <img src={image} alt={"mypost"} />}
                <input type="file" accept='image/*' onChange={handleImage} />
                <input type="text" placeholder='Caption...' value={caption} onChange={(e) => setCaption(e.target.value)} />
                <Button type="submit">
                    {
                        newPostLoading ? "Uploading..." : "Upload Post"
                    }

                </Button>
            </form>
        </div>
    )
}

export default NewPost;