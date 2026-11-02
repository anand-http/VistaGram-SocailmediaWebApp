import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseUrl } from "../..";

export const postOfFollowing = createAsyncThunk("postOfFollowing", async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/post`, { withCredentials: true });
        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;
    }

})




export const likeAndUnlikePost = createAsyncThunk("likeAndUnlikePost", async (postId) => {
    try {
        const response = await axios.get(`${baseUrl}/api/v1/post/${postId}`, { withCredentials: true })
        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;

    }
})




export const commentAdd = createAsyncThunk("commentAdd", async ({ commentText, postId }) => {
    try {
        const response = await axios.put(`${baseUrl}/api/v1/post/comments/${postId}`, { commentText },

            { withCredentials: true }
        );

        return response.data;


    } catch (error) {
        console.log(error);
        throw error.response.data.message;

    }

})




export const commentDelete = createAsyncThunk("commentDelete", async ({ postId, commentId }) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/v1/post/comments/${postId}`, { data: { commentId }, withCredentials: true });

        return response.data;

    } catch (error) {
        console.log(error);
        throw error.response.data.message;

    }
})



export const getMyPost = createAsyncThunk("getMyPost", async () => {
    try {

        const response = await axios.get(`${baseUrl}/api/v1/mypost`, { withCredentials: true })

        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;
    }
})



export const uploadPost = createAsyncThunk("uploadPost", async ({ caption, image }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/v1/post/upload`, { caption, image },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
        )

        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;

    }

})




export const captionUpdate = createAsyncThunk("captionUpdate", async ({ captionUpdateText, postId }) => {
    console.log(captionUpdateText, postId);
    try {

        const response = await axios.put(`${baseUrl}/api/v1/post/${postId}`, { captionUpdateText },
         {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
        )
        return response.data;

    } catch (err) {

        console.log(err);
        throw err.response.data.message;

    }
})



export const deletePost = createAsyncThunk("deletePost", async (postId) => {
    try {
        const response = await axios.delete(`${baseUrl}/api/v1/post/${postId}`, { withCredentials: true })
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;
    }
})



export const getUserPost = createAsyncThunk("getUserPost", async (userId) => {
    try {

        const response = await axios.get(`${baseUrl}/api/v1/userposts/${userId}`, { withCredentials: true });
        return response.data;

    } catch (err) {
        console.log(err);
        throw err.response.data.message;
    }
})


export const clearMessage = () => ({
    type: "clearMessage",
})