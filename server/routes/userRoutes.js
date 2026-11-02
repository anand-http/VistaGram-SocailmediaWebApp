import express from 'express';
import { UpdateProfile, deleteMyProfile, forgetPassword, getAllUser, getUserProfile, login, logout, myProfile, register, resetPassword, updatePassword } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update/password').put(isAuthenticated, updatePassword);
router.route('/update/profile').put(isAuthenticated, UpdateProfile);
router.route('/delete/profile').delete(isAuthenticated, deleteMyProfile);
router.route('/myprofile').get(isAuthenticated, myProfile);
router.route('/userprofile/:id').get(isAuthenticated, getUserProfile);
router.route('/allusers').get(isAuthenticated, getAllUser);
router.route('/forgot/password').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword);



export default router;