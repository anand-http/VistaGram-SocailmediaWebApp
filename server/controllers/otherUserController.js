import Post from '../models/Post.js';
import User from '../models/User.js';


export const followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            });
        }

        if (loggedInUser.followings.includes(userToFollow._id)) {

            const indexFollowing = loggedInUser.followings.indexOf(userToFollow._id);
            const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.followings.splice(indexFollowing, 1);
            userToFollow.followers.splice(indexFollower, 1);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "Unfollowing User"
            })
        }
        else {
            loggedInUser.followings.push(userToFollow._id);
            userToFollow.followers.push(loggedInUser._id);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "following user"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }

}



export const getPostOfFollowing = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner: {
                $in: user.followings,
            },
        }).populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts: posts.reverse(),
        })

    } catch (err) {


        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}