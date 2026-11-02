import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home/home';
import { UserLoad } from './redux/actions/userAction';
import Register from './components/Register/register';
import MyAccount from './components/MyAccount/myAccount';
import NewPost from './components/NewPost/newPost';
import UpdateProfile from './components/updateProfile/updateProfile';
import UpdatePassword from './components/UpdatePassword/updatePassword';
import ForgotPassword from './components/ForgetPassword/forgotPassword';
import ResetPassword from './components/ResetPassword/resetPassword';
import UserProfile from './components/UserProfile/userProfile';
import Search from './components/Search/search';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.User)

  useEffect(() => {

    dispatch(UserLoad());

  }, [dispatch])


  return (
    <Router>
      <div className='App'>
        <div className='headerss'>
          {isAuthenticated && <Header />}
        </div>

        {isAuthenticated ?

          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<MyAccount />} />
              <Route path='/account' element={<MyAccount />} />
              <Route path='/newpost' element={<NewPost />} />
              <Route path='/update/profile' element={<UpdateProfile />} />
              <Route path='/update/password' element={<UpdatePassword />} />
              <Route path='/forgot/password' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<UpdatePassword />} />
              <Route path='/userprofile/:id' element={<UserProfile />} />
              <Route path='/search' element={<Search />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div> :

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        }
      </div>
    </Router>
  )
}


export default App;