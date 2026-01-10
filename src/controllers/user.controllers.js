import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullname, email, username, password } = req.body;

    //validation (use zod etc)
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with emial or username already exists")

    }

    console.warn(req.files)
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }
    // if(!coverLocalPath){
    //     throw new ApiError(400, "CoverImage file is missing")
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // let coverImage = "";
    // if(coverLocalPath){
    //     coverImage = await uploadOnCloudinary(coverLocalPath)
    // }

    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        console.log("Uploaded avatar",avatar)
    } catch (error) {
        console.log("Error uploading avatar",error)
        throw new ApiError(500,"Filed to upload avatar")
    }

        let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverLocalPath)
        console.log("Uploaded coverImage",coverImage)
    } catch (error) {
        // add delete from cloudinary
        console.log("Error uploading avatar",error)
        throw new ApiError(500,"Filed to upload coverImage")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong   while registering a user")
    }


    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered successfully"))

})

export { registerUser }