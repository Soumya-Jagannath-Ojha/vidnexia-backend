import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(
            localFilePath, {
                resource_type: "auto"      //type of file
            }
        )
        console.log("File uploaded on cloudinary. File src: " + response.url)
        // Once the file is uploaded, we whould like to delete it from our server
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log("Error on cloudinary",error)
        fs.unlinkSync(localFilePath);
        return null;
    }
}




export {uploadOnCloudinary};