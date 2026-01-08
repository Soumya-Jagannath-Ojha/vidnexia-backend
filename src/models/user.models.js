import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullname:{
             type: String,
            required:true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary Image
            required: true
        },
        coverImage: {
            type: String, //cloudinary Image
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {timestamps: true}    //createdAt, UptatedAt
)

export const User = mongoose.model("User",userSchema)

// name them into uppercase