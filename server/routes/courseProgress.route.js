import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import {getCourseProgress,markAsComplete,markAsInComplete,updateLectureProgress} from "../controllers/courseProgress.controller.js"
const router= express.Router();

router.get("/:courseId", isAuthenticated, getCourseProgress);
router.post("/:courseId/lecture/:lectureId/view", isAuthenticated, updateLectureProgress)
router.post("/:courseId/complete",isAuthenticated,markAsComplete)
router.post("/:courseId/incomplete", isAuthenticated, markAsInComplete)

export default router;