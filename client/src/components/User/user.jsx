import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const User = ({ userId, avatar, name }) => {
    return (
        <Link to={`/userprofile/${userId}`} className='homeUser'>
            <img src={avatar} alt="mypic" />
            <Typography>{name}</Typography>
        </Link>
    )
}

export default User