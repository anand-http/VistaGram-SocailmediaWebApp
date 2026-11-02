import React, { useEffect } from 'react';
import './updateProfile.css';
import { useState } from 'react';
import { Typography, Avatar, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { UserLoad, clearUserMessage, updateMyProfile } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';


const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { userLoadData, updateProfileLoading, updateProfileData, updateProfileError } = useSelector((state) => state.User);
    const user = userLoadData?.user;

    console.log("outside function", updateProfileData, updateProfileError)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);


    const handleProfileUpdate = (e) => {
        e.preventDefault();

        dispatch(updateMyProfile({ name, email, avatar }));
    }

    useEffect(() => {

        if (updateProfileData) {
            dispatch(UserLoad());
            navigate('/account');
            alert.success(updateProfileData.message)
            dispatch(clearUserMessage());
        }
        if (updateProfileError) {
            alert.error(updateProfileError);
            dispatch(clearUserMessage());
        }
    }, [updateProfileData, updateProfileError, dispatch, alert,navigate]);




    const handleAvatar = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
                setAvatarPrev(Reader.result);
            }
        }
    }


    return (
        <div className="updateProfile">
            <form className='updateProfileForm' onSubmit={handleProfileUpdate}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>VistaGram</Typography>
                <Avatar src={avatarPrev} alt='user' sx={{ height: "10vmax", width: "10vmax" }} />
                <input type="file" accept='image/*' onChange={handleAvatar} />

                <input className='updateProfileInputs' type="text" placeholder='Enter your name' value={name} required onChange={(e) => setName(e.target.value)} />
                <input className='updateProfileInputs' type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button disabled={updateProfileLoading} type="submit"> {updateProfileLoading ? "Please wait..." : "Update"}</Button>
            </form>
        </div>
    )
}

export default UpdateProfile;