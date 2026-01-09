import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;

    //validation (use zod etc)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with emial or username already exists")

    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }
    // if(!coverLocalPath){
    //     throw new ApiError(400, "CoverImage file is missing")
    // }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    let coverImage = "";
    if(coverLocalPath){
        coverImage = await uploadOnCloudinary(coverLocalPath)
    }

})

export { registerUser }