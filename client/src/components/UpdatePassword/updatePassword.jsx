import React, { useEffect, useState } from 'react';
import './updatePassword.css';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserMessage, updatePassword } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { updatePasswordLoading, updatePasswordError, updatePasswordState } = useSelector((state) => state.User);

    const changePassword = (e) => {
        e.preventDefault();
        dispatch(updatePassword({ oldPassword, newPassword }));
    }

    useEffect(() => {
        console.log(updatePasswordError);
        if (updatePasswordState) {
            alert.success(updatePasswordState.message);
            navigate('/account');
            dispatch(clearUserMessage());
        }
        if (updatePasswordError) {
            alert.error(updatePasswordError);
            dispatch(clearUserMessage());

        }
    }, [updatePasswordState, alert, updatePasswordError,dispatch,navigate]);



    return (
        <div className='updatePassword'>
            <form className='updatePasswordForm' onSubmit={changePassword}>
                <Typography variant='h4'>VistaGram</Typography>


                <div className="updatePasswordInputWrapper">

                    <input className='updatePasswordInputs' required type={showPassword1 ? "text" : "password"} placeholder='Enter Old Password'
                        value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }}
                    />
                    {
                        oldPassword &&
                        <span onClick={() => setShowPassword1(!showPassword1)}>{showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    }
                </div>

                <div className="updatePasswordInputWrapper">
                    <input className='updatePasswordInputs' required type={showPassword2 ? "text" : "password"} placeholder='Enter new Password'
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {
                        newPassword &&
                        <span onClick={() => setShowPassword2(!showPassword2)}>{showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    }
                </div>

                <Button disabled={updatePasswordLoading} type='submit'>{updatePasswordLoading ? "Updating..." : "Update Password"}</Button>
            </form>

        </div>
    )
}

export default UpdatePassword;