import React, { useState } from 'react'
import './search.css';
import { Button, Typography } from '@mui/material';
import { getAllUser } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import User from '../User/user';
import { Link } from 'react-router-dom';
import Logo from '../Logo/logo';

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const { getAllUserData, getAllUserLoading } = useSelector((state) => state.User);
    const users = getAllUserData?.users;

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getAllUser(searchText));
    }
    return (
        <div className='search'>
            <Logo/>
            <form className='searchForm' onSubmit={handleSearch}>
                <Typography variant='h4'></Typography>

                <input required type="text" placeholder='Search...'
                    value={searchText} onChange={(e) => setSearchText(e.target.value)}
                />

                <Button type='submit'>{getAllUserLoading ? "Searching.." : "Search"}</Button>

                <div className="searchResults">
                    {
                        users && users.map((item) => {
                            console.log(item);
                            return (
                                <User key={item._id} userId={item._id} avatar={item.avatar.url} name={item.name} />
                            )
                        })
                    }

                </div>
            </form>

        </div>
    )
}

export default Search;