import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { baseUrl } from "../..";

export const UserLogin = createAsyncThunk("userLogin", async ({ email, password }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        return response.data;

    } catch (error) {
        console.log( error);
        throw error.response.data.message;
    }


})


export const UserLoad = createAsyncThunk("userLoad", async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/myprofile`, { withCredentials: true });
        return response.data;

    } catch (error) {
        console.log( error);
        throw error.response.data.message;
    }
})


export const UserRegister = createAsyncThunk("userRegister", async ({ name, email, password, avatar }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/register`, { name, email, password, avatar }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,

        });
        return response.data;

    } catch (error) {
        console.log("error", error);
        throw error.response.data.message;
    }

})


export const getAllUser = createAsyncThunk("getAllUser", async (name = "") => {
    try {

        const response = await axios.get(`${baseUrl}/api/v1/allusers?name=${name}`, { withCredentials: true })
        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }
})


export const userLogout = createAsyncThunk("userLogout", async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/logout`);
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;

    }
})



export const updateMyProfile = createAsyncThunk("updateMyProfile", async ({ name, email, avatar }) => {
    try {

        const response = await axios.put(
            `${baseUrl}/api/v1/update/profile`,
            { name, email, avatar },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;

    }
})


export const updatePassword = createAsyncThunk("updatePassword", async ({ oldPassword, newPassword }) => {
    try {

        const response = await axios.put(`${baseUrl}/api/v1/update/password`, { oldPassword, newPassword }, { headers: { "Content-Type": "application/json" }, }, { withCredentials: true })

        return response.data;
    } catch (err) {

        console.log(err);

        throw err.response.data.message;


    }

})


export const deleteAccount = createAsyncThunk("deleteAccount", async () => {
    try {
        const response = await axios.delete(`${baseUrl}/api/v1/delete/profile`, { withCredentials: true });
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;

    }
})


export const forgotPassword = createAsyncThunk("forgotPassword", async (email) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/forgot/password`, { email });
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;

    }

})

export const resetPassword = createAsyncThunk("resetPassword", async ({ password, token }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/v1/password/reset/${token}`, { password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return response.data;

    } catch (err) {

        console.log(err);
        throw err.response.data.message;

    }
})

export const followAndUnfollow = createAsyncThunk("followAndUnfollow", async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/followuser/${userId}`, { withCredentials: true });
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;
    }
})




export const getUserProfile = createAsyncThunk("getUserProfile", async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/userprofile/${userId}`, { withCredentials: true })
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;
    }
})



export const clearUserMessage = () => ({
    type: "clearUserMessage",
})