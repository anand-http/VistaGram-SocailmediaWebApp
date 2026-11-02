import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import './forgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userAction';

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.User);

    const [email, setEmail] = useState("");


    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));

    }
    return (
        <div className='forgotPassword'>
            <form className='forgotPasswordForm' onSubmit={handleForgotPassword}>
                <Typography variant='h4'>Forgot Password</Typography>
                <input required className='forgotPasswordInputs' type="text" placeholder='Enter your email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <Button type='submit'>{isLoading ? "Sending..." : "Send Token"}</Button>
            </form>
        </div>
    )
}

export default ForgotPassword;