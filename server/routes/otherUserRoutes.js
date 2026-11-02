import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { followUser, getPostOfFollowing } from '../controllers/otherUserController.js';

const router = express.Router();

router.route('/followuser/:id').get(isAuthenticated, followUser);


router.route('/post').get(isAuthenticated, getPostOfFollowing);

export default router;

