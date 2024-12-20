import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import upload from "../utils/multer.js"
import {register,login,logout,getUserProfile,updateProfile} from "../controllers/user.controller.js"

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile/update", isAuthenticated, upload.single("profilePhoto"), updateProfile)

export default router