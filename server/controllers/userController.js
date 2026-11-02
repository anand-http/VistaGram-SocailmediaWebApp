import User from "../models/User.js";
import Post from '../models/Post.js';
import { sendEmail } from "../middleware/sendMail.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar"
        });


        user = await User.create({ name, email, password, avatar: { public_id: myCloud.public_id, url: myCloud.secure_url } })

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite:"none",
            secure:true,
        }

        res.status(201).cookie("token", token, options).json({
            success: true,
            message: "User registerd successful",
            user,
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password").populate("posts followings followers");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't Exist"
            })
        }


        const isMatch = await user.matchPassword(password);


        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }


        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure:true,
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
        })

    }
    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logged out"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "Please provide the Old and new password"
            })
        }


        const isMatch = await user.matchPassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password doesn't match"
            })
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}



export const UpdateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const { name, email, avatar } = req.body;

        if (name !== undefined) {
            user.name = name
        }
        if (email !== undefined) {
            user.email = email
        }

        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatar"
            })

            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(200).json
            ({
                success: true,
                message: "Profile Updated"
            })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}




export const deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const posts = user.posts;
        const followers = user.followers;
        const followings = user.followings;
        const userId = user._id;

        // delete photos from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.deleteOne();

        //logout
        res.cookie("token", null, { maxAge: 0, httpOnly: true })


        // deleting post one by one
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await post.deleteOne();
        }

        //Removing user from follower's following

        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.followings.indexOf(userId);
            follower.followings.splice(index, 1);

            await follower.save();

        }


        //Removing user from following's follower

        for (let i = 0; i < followings.length; i++) {
            const following = await User.findById(followings[i]);

            const index = following.followers.indexOf(userId);
            following.followers.splice(index, 1);

            await following.save();
        }


        //Removing all comments of user from all posts

        const allPost = await Post.find();

        for (let i = 0; i < allPost; i++) {
            const post = await Post.findById(allPost[i]._id);

            for (let j = 0; j < post.comments.length; j++) {
                if (post.comments[j].user === userId) {
                    post.comments.splice(j, 1);
                }
            }
            await post.save();
        }

        //removing likes of user from all posts

        for (let i = 0; i < allPost.length; i++) {
            const post = await Post.findById(allPost[i]._id);

            for (let j = 0; j < post.likes.length; j++) {
                if (post.likes[j] === userId) {
                    post.likes.splice(j, 1);
                }
            }
            await post.save();
        }




        res.status(200).json({
            success: true,
            message: "Profile deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}



export const myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts followers followings");

        res.status(200).json(
            {
                success: true,
                user
            }
        )


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json(
            {
                success: true,
                user
            }
        )


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


export const getAllUser = async (req, res) => {
    try {

        const users = await User.find({ _id: { $ne: req.user._id }, name: { $regex: req.query.name, $options: "i" } });


        res.status(200).json(
            {
                success: true,
                users
            }
        )


    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}



export const forgetPassword = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        const resetPasswordToken = await user.getResetPasswordToken();


        await user.save();

        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`

        const message = `Reset your password by clicking on the link below \n\n ${resetUrl}`;

        try {

            await sendEmail({ email: user.email, subject: "Reset Password", message });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            })


        } catch (err) {


            user.resetPasswordExpire = undefined
            user.resetPasswordToken = undefined
            await user.save();

            res.status(500).json({
                success: false,
                message: err.message
            })

        }


    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: err.message
            }
        )

    }
}




export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired"
            })
        }

        user.password = req.body.password;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


