import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashed,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User registered",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to register user",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            message:"User doesnt exist",
            success:false
        })
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password)
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Pls enter correct password",
            success:false
        })
    }
    generateToken(res, user , `Welcome back ${user.name}`)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in logging",
      success: false,
    });
  }
};

export const logout = async(req,res)=>{
    try {
      return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged out user ",
        success:true
      })  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error in logging out user",
            success:false
        })
    }
};

export const getUserProfile = async(req,res)=>{
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses")
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"error in fetching user data",
            success:false
        })
    }
};

export const updateProfile= async(req,res)=>{
    try {
        const userId=req.id;
        const {name}= req.body;
        const profilePhoto= req.file;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }

        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error in updating profile",
            success:false
        })
    }
}