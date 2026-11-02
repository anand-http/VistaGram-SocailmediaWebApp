import React, { useEffect, useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material'
import './register.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserRegister, clearUserMessage } from '../../redux/actions/userAction';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAlert } from 'react-alert';
const Register = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { userRegisterLoading, userRegisterData, userRegisterError } = useSelector((state) => state.User);

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(UserRegister({ name, email, password, avatar }));
    }

    useEffect(() => {
        if (userRegisterData) {
            alert.success(userRegisterData);
            dispatch(clearUserMessage());
        }
        if (userRegisterError) {
            alert.error(userRegisterError);
            dispatch(clearUserMessage());
        }
    }, [userRegisterData, userRegisterError, dispatch, alert])


    const handleAvatar = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();

        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        }
    }


    return (
        <div className="register">
            <form className='registerForm' onSubmit={handleRegister}>
                <Typography variant='h4' style={{ padding: "2vmax" }}>VistaGram</Typography>
                <Avatar src={avatar} alt='user' sx={{ height: "10vmax", width: "10vmax" }} />
                <input type="file" accept='image/*' onChange={handleAvatar} />

                <div className="registerInputsWrapper">
                    <input className='registerInputs' type="text" placeholder='Enter your name' value={name} required onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="registerInputsWrapper">
                    <input className='registerInputs' type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="registerInputsWrapper">
                    <input className='registerInputs' type={showPassword ? "text" : "password"} placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    {password && <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>}
                </div>


                <Link to="/"><Typography>Already a user?</Typography></Link>
                <Button disabled={userRegisterLoading} type="submit">{userRegisterLoading ? "Please wait..." : "Register"}</Button>
            </form>
        </div>
    )
}

export default Register;