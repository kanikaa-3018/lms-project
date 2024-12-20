import { v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET

});

export const uploadMedia = async(file)=>{
    try {
        const uploadedResponse = await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return uploadedResponse
    } catch (error) {
        console.log(error||"Error in Uploading File")
    }
}

export const deleteMediaFromCloudinary = async(publicId)=>{
    try {
       await cloudinary.uploader.destroy(publicId) 
    } catch (error) {
        console.log(error)
    }
}

export const deleteVideoFromCloudinary= async(publicId)=>{
    try {
       await cloudinary.uploader.destroy(publicId,{
        resource_type:"video"
       }) 
    } catch (error) {
        console.log(error)
    }
}