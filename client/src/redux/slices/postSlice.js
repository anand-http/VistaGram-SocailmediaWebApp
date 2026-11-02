import { createSlice } from "@reduxjs/toolkit";
import {
    postOfFollowing, likeAndUnlikePost,
    commentAdd, commentDelete, getMyPost, uploadPost,
    captionUpdate, deletePost, getUserPost,
} from "../actions/postAction";


const PostSlice = createSlice({
    name: "Post",
    initialState: {
        post: null,
        isLoading: false,
        error: null,

        like: null,
        likeIsLoading: false,
        likeError: null,


        comment: null,
        commentIsLoading: false,
        commentError: null,


        dltComment: null,
        dltCommentLoading: false,
        dltCommentError: null,


        myPost: null,
        myPostLoading: false,
        myPostError: null,


        newPost: null,
        newPostLoading: false,
        newPostError: null,


        captionUpdate: null,
        captionUpdateLoading: false,
        captionUpdateError: null,

        postDelete: null,
        postDeleteLoading: false,
        postDeleteError: null,

        userPost: null,
        userPostError: null,
        userPostLoading: null,


    },
    extraReducers: (builder) => {

        builder.addCase(postOfFollowing.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(postOfFollowing.fulfilled, (state, action) => {
            state.isLoading = false;
            state.post = action.payload;
            state.error = null;
        })

        builder.addCase(postOfFollowing.rejected, (state, action) => {
            state.isLoading = false;
            state.post = null;
            state.error = action.error.message;
        })



        builder.addCase(likeAndUnlikePost.pending, (state) => {
            state.likeIsLoading = true;
        })
        builder.addCase(likeAndUnlikePost.fulfilled, (state, action) => {
            state.likeIsLoading = false;
            state.like = action.payload;
            state.likeError = null;
        })

        builder.addCase(likeAndUnlikePost.rejected, (state, action) => {
            state.likeIsLoading = false;
            state.like = null;
            state.likeError = action.error.message;
        })



        builder.addCase(commentAdd.pending, (state) => {
            state.commentIsLoading = true;
        })
        builder.addCase(commentAdd.fulfilled, (state, action) => {
            state.commentIsLoading = false;
            state.comment = action.payload;
            state.commentError = null;
        })
        builder.addCase(commentAdd.rejected, (state, action) => {
            state.commentIsLoading = false;
            state.comment = null;
            state.commentError = action.error.message;
        })



        builder.addCase(commentDelete.pending, (state) => {
            state.dltCommentLoading = true;
        })
        builder.addCase(commentDelete.fulfilled, (state, action) => {
            state.dltCommentLoading = false;
            state.dltComment = action.payload;
            state.dltCommentError = null;
        })
        builder.addCase(commentDelete.rejected, (state, action) => {
            state.dltCommentLoading = false;
            state.dltComment = null;
            state.dltCommentError = action.error.message;
        })




        builder.addCase(getMyPost.pending, (state) => {
            state.myPostLoading = true;
        })
        builder.addCase(getMyPost.fulfilled, (state, action) => {
            state.myPostLoading = false;
            state.myPost = action.payload;
            state.myPostError = null;
        })
        builder.addCase(getMyPost.rejected, (state, action) => {
            state.myPostLoading = false;
            state.myPost = null;
            state.myPostError = action.error.message;
        })



        builder.addCase(uploadPost.pending, (state) => {
            state.newPostLoading = true;
        })
        builder.addCase(uploadPost.fulfilled, (state, action) => {
            state.newPostLoading = false;
            state.newPost = action.payload;
            state.newPostError = null;
        })
        builder.addCase(uploadPost.rejected, (state, action) => {
            state.newPostLoading = false;
            state.newPost = null;
            state.newPostError = action.error.message;
        })


        builder.addCase(captionUpdate.pending, (state) => {
            state.captionUpdateLoading = true;
        })
        builder.addCase(captionUpdate.fulfilled, (state, action) => {
            state.captionUpdateLoading = false;
            state.captionUpdate = action.payload;
            state.captionUpdateError = null;
        })
        builder.addCase(captionUpdate.rejected, (state, action) => {
            state.captionUpdateLoading = false;
            state.captionUpdate = null;
            state.captionUpdateError = action.error.message;
        })



        builder.addCase(deletePost.pending, (state) => {
            state.postDeleteLoading = true;
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.postDeleteLoading = false;
            state.postDelete = action.payload;
            state.postDeleteError = null;
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.postDeleteLoading = false;
            state.postDelete = null;
            state.postDeleteError = action.error.message;
        })




        builder.addCase(getUserPost.pending, (state) => {
            state.userPostLoading = true
        });

        builder.addCase(getUserPost.fulfilled, (state, action) => {
            state.userPostLoading = false;
            state.userPost = action.payload;
            state.userPostError = null;
        })

        builder.addCase(getUserPost.rejected, (state, action) => {
            state.userPostLoading = false;
            state.userPost = null;
            state.userPostError = action.error.message;
        })


        builder.addCase("clearMessage", (state) => {
            state.newPost = null;
            state.newPostError = null;
            state.like = null;
            state.likeError = null;
            state.comment = null;
            state.commentError = null;
            state.dltComment = null;
            state.dltCommentError = null;
        })

    }

})


export default PostSlice.reducer;