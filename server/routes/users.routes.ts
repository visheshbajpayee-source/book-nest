import express from "express";
import {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
  getUserById,
  followUser,
  unfollowUser,
} from "../controllers/users.controller.ts";
import protect from "../middleware/auth.ts";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.put("/avatar", protect, updateUserAvatar);
router.post("/logout", protect, logoutUser);
router.get("/:id", protect, getUserById);
router.post("/:id/follow", protect, followUser);
router.delete("/:id/follow", protect, unfollowUser);

export default router;
