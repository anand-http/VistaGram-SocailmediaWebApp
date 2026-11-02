import React, { useState } from 'react';
import './resetPassword.css';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/userAction';
import { useParams, Link } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const params = useParams();


    const token = params.token;
    const handlePasswordReset = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ password, token }));
    }
    return (
        <div className='resetPassword'>
            <form className='resetPasswordForm' onSubmit={handlePasswordReset}>
                <Typography variant='h4'>VistaGram</Typography>

                <div className="resetPasswordInputWrapper">


                    <input type={showPassword ? "text" : "password"} className='resetPasswordInputs' placeholder='Enter New Password'
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {password && <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff fontSize='30px' /> : <VisibilityIcon fontSize='30px' />}</span>}

                </div>



                <Link to={'/'}>Login</Link>
                <Typography variant='h6'>OR</Typography>
                <Link to="/forgot/password"><Typography>Request Another Token</Typography> </Link>
                <Button type='submit'>Reset Password</Button>
            </form>
        </div>
    )
}

export default ResetPassword;