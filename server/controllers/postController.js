import Post from '../models/Post.js'
import User from '../models/User.js';
import cloudinary from 'cloudinary';

export const createPost = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "Posts"
        })
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
            owner: req.user._id
        }

        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);

        user.posts.unshift(post._id);

        await user.save();
        res.status(201).json({
            success: true,
            message: "Post Created"
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);

            post.likes.splice(index, 1);

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Post Unliked"
            });
        }
        else {
            post.likes.push(req.user._id);
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post liked"
            })
        }


    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        await cloudinary.v2.uploader.destroy(post.image.public_id);


        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id);

        user.posts.splice(index, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Post deleted"

        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}


export const updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }


        post.caption = req.body.captionUpdateText;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const addingComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        let commentIndex = -1;

        //Checking if commment already exist 
        post.comments.forEach((item, index) => {

            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        })

        if (commentIndex !== -1) {

            post.comments[commentIndex].comment = req.body.commentText;
            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment updated"
            })

        }
        else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.commentText
            })

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment added"
            })
        }



    } catch (err) {
        res.status(500).json({
            success: true,
            message: err.message
        })

    }
}


export const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if (post.owner.toString() === req.user._id.toString()) {

            if (req.body.commentId == undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Comment id is required"
                });
            }
            post.comments.forEach((item, index) => {

                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index, 1);
                }
            });

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Selected comment deleted"
            })
        }


        else {
            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index, 1);
                }
            })
        }

        await post.save();
        res.status(200).json({
            success: true,
            message: "Your comment has deleted"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

export const myPost = async (req, res) => {

    try {
        const user = await User.findById(req.user._id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}





export const userPost = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        const posts = [];

        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findById(user.posts[i]).populate("owner likes comments.user");
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
}