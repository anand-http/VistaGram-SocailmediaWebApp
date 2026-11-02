import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    avatar: {
        public_id: String,
        url: String
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exist"]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be atleast 8 character"],
        select: false
    },

    posts: [{
        type: mongoose.Schema.ObjectId,
        ref: "Post",

    }],

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],


    resetPasswordToken: String,
    resetPasswordExpire: Date,


})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})


userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)

}


userSchema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(20).toString("hex");


    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model("User", userSchema);

export default User;