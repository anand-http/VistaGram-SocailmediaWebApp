import { createSlice } from '@reduxjs/toolkit';
import {
    UserLogin, UserRegister, UserLoad, getAllUser, userLogout,
    updateMyProfile, updatePassword, deleteAccount,
    forgotPassword, resetPassword, followAndUnfollow, getUserProfile
} from '../actions/userAction';


const UserSlice = createSlice({
    name: "User",
    initialState: {
        data: null,
        userLoadData: null,
        userRegisterData: null,
        getAllUserData: null,

        isLoading: false,
        userLoadLoading: false,
        userRegisterLoading: false,
        getAllUserLoading: false,

        error: null,
        userLoadError: null,
        userRegisterError: null,
        getAllUserError: null,

        logout: null,
        logoutError: null,


        updateProfileData: null,
        updateProfileLoading: false,
        updateProfileError: null,

        updatePasswordState: null,
        updatePasswordLoading: false,
        updatePasswordError: null,


        deleteProfile: null,
        deleteProfileLoading: false,
        deleteProfileError: null,

        followw: null,
        followLoading: false,
        followError: null,

        followUser: null,
        followUserLoading: false,
        followUserError: null,

        isAuthenticated: false,
    },
    extraReducers: (builder) => {


        builder.addCase(UserLogin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.userLoadData = action.payload;
            state.error = null;
            state.isAuthenticated = true;
        })
        builder.addCase(UserLogin.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
            state.data = null;
            state.isAuthenticated = false;
        })



        builder.addCase(UserLoad.pending, (state) => {
            state.userLoadLoading = true;
        })

        builder.addCase(UserLoad.fulfilled, (state, action) => {
            state.userLoadLoading = false;
            state.userLoadData = action.payload;
            state.userLoadError = null;
            state.isAuthenticated = true;
        })

        builder.addCase(UserLoad.rejected, (state, action) => {
            state.userLoadError = action.error.message;
            state.userLoadLoading = false;
            state.userLoadData = null;
            state.isAuthenticated = false;
        })


        builder.addCase(UserRegister.pending, (state) => {
            state.userRegisterLoading = true;
        })
        builder.addCase(UserRegister.fulfilled, (state, action) => {
            state.userRegisterLoading = false;
            state.userRegisterData = action.payload;
            state.userLoadData = action.payload;
            state.userRegisterError = null;
            state.isAuthenticated = true;

        })
        builder.addCase(UserRegister.rejected, (state, action) => {
            state.userRegisterError = action.error.message;
            state.userRegisterLoading = false;
            state.userRegisterData = null;
            state.isAuthenticated = false;

        })


        builder.addCase(getAllUser.pending, (state) => {
            state.getAllUserLoading = true;
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.getAllUserData = action.payload;
            state.getAllUserLoading = false;
            state.getAllUserError = null;
        })
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.getAllUserError = action.error.message;
            state.getAllUserLoading = false;
            state.getAllUserData = null;
        })


        builder.addCase(userLogout.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.logout = action.payload;
            state.logoutError = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.logoutError = action.error.message;
            state.logout = null;
            state.isLoading = false;
        })


        builder.addCase(updateMyProfile.pending, (state) => {
            state.updateProfileLoading = true;
        });
        builder.addCase(updateMyProfile.fulfilled, (state, action) => {
            state.updateProfileLoading = false;
            state.updateProfileData = action.payload;
            state.updateProfileError = null;

        })
        builder.addCase(updateMyProfile.rejected, (state, action) => {
            state.updateProfileLoading = false;
            state.updateProfileData = null;
            state.updateProfileError = action.error.message;

        })


        builder.addCase(updatePassword.pending, (state) => {
            state.updatePasswordLoading = true;
        });

        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.updatePasswordLoading = false;
            state.updatePasswordState = action.payload;
            state.updatePasswordError = null;

        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.updatePasswordLoading = false;
            state.updatePasswordState = null;
            state.updatePasswordError = action.error.message;
        })



        builder.addCase(deleteAccount.pending, (state) => {
            state.deleteProfileLoading = true;
        });

        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.deleteProfileLoading = false;
            state.deleteProfile = action.payload;
            state.deleteProfileError = null;

        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.deleteProfileLoading = false;
            state.deleteProfile = null;
            state.deleteProfileError = action.error.message;

        })


        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;

        })
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.error.message;

        });


        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;

        })

        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = null;
        })



        builder.addCase(followAndUnfollow.pending, (state) => {
            state.followUserLoading = true;
        });

        builder.addCase(followAndUnfollow.fulfilled, (state, action) => {
            state.followUserLoading = false;
            state.followUser = action.payload;
            state.followUserError = null;

        })

        builder.addCase(followAndUnfollow.rejected, (state, action) => {
            state.followUserLoading = false;
            state.followUserError = action.error.message;
            state.followUser = null;
        })



        builder.addCase(getUserProfile.pending, (state) => {
            state.followLoading = true;
        });

        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.followLoading = false;
            state.followw = action.payload;
            state.followError = null;

        })

        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.followLoading = false;
            state.followError = action.error.message;
            state.followw = null;
        })



        builder.addCase("clearUserMessage", (state) => {
            state.logout = null;
            state.logoutError = null;
            state.updateProfileData = null;
            state.updateProfileError = null;
            state.updatePasswordState = null;
            state.updatePasswordError = null;
            state.deleteProfile = null;
            state.deleteProfileError = null;
            state.data = null;
            state.error = null;
            state.userRegisterData = null;
            state.userRegisterError = null;
        })
    }
})

export default UserSlice.reducer;

