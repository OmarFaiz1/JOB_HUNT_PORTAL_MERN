import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register); // Registration does not need authentication
router.route("/login").post(login); // Login does not need authentication
router.route("/logout").get(logout); // Logout could optionally require authentication
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile); // Profile update requires authentication

export default router;
