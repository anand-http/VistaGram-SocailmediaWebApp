import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from "../../redux/actions/userAction";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAlert } from 'react-alert';

import { clearUserMessage } from '../../redux/actions/userAction';

const Login = () => {
    const dispatch = useDispatch()
    const alert = useAlert();

    const { isLoading, data, error } = useSelector((state) => state.User);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);


    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(UserLogin({ email, password }));
    };

    useEffect(() => {
        if (data) {
            alert.success(data.message);
            dispatch(clearUserMessage());
        }
        if (error) {
            alert.error(error);
            dispatch(clearUserMessage());
        }

    }, [data, error, dispatch, alert])

    return (
        <div className='login'>
            <form className='loginForm' onSubmit={loginHandler}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>VistaGram</Typography>
                <div className="loginInputWrapper">
                    <input className='loginInput' type='email' placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="loginInputWrapper">
                    <input className='loginInput' type={showPassword ? "text" : "password"} placeholder='Enter your Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    {password && <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>}
                </div>



                <Link to={'/forgot/password'}> <Typography>Forgot Password?</Typography> </Link>
                <Link to={'/register'}> <Typography>New user?</Typography> </Link>
                <Button disabled={isLoading} type='submit' >{isLoading ? "Please wait.." : "Login"}</Button>
            </form>
        </div>
    )
}

export default Login;