import express from 'express';
import { addingComments, createPost, deleteComment, deletePost, likeAndUnlikePost, updateCaption, myPost, userPost } from '../controllers/postController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.route('/post/upload').post(isAuthenticated, createPost);

router.route('/post/:id').get(isAuthenticated, likeAndUnlikePost).put(isAuthenticated, updateCaption).delete(isAuthenticated, deletePost)

router.route('/post/comments/:id').put(isAuthenticated, addingComments).delete(isAuthenticated, deleteComment);

router.route('/mypost').get(isAuthenticated, myPost);

router.route('/userposts/:id').get(isAuthenticated, userPost);

export default router;
