import crypto from "crypto";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";
import type { IUser } from "../models/user.model.ts";

interface AuthRequest extends Request {
  user?: IUser;
}

const generateAccessToken = (userId: string) => {
  const secret = process.env.JWT_SECRET || "booknest-secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};

const generateRefreshToken = (userId: string) => {
  const secret = process.env.JWT_REFRESH_SECRET || "booknest-refresh-secret";
  return jwt.sign({ id: userId }, secret, { expiresIn: "30d" });
};

const userResponse = (user: IUser) => ({
  id: user._id,
  name: user.name,
  userName: user.userName,
  email: user.email,
  bio: user.bio || "",
  avatar: user.avatar || "",
  followers: user.followers?.length || 0,
  following: user.following?.length || 0,
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "A user with that email or username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      token: generateAccessToken(user._id.toString()),
      refreshToken,
      user: userResponse(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const refreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login successful",
      token: generateAccessToken(user._id.toString()),
      refreshToken,
      user: userResponse(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const secret = process.env.JWT_REFRESH_SECRET || "booknest-refresh-secret";
    const decoded = jwt.verify(refreshToken, secret) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const newRefreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      token: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logoutUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    currentUser.refreshToken = "";
    await currentUser.save();

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "If the email is registered, a reset link will be sent" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600 * 1000);
    await user.save();

    return res.status(200).json({
      message: "Password reset token generated",
      resetToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error generating password reset token" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = "";
    user.resetPasswordExpires = null;
    user.refreshToken = "";

    const newRefreshToken = generateRefreshToken(user._id.toString());
    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      token: generateAccessToken(user._id.toString()),
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password" });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = req.user;
    const { name, userName, bio, avatar } = req.body;

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (name) currentUser.name = name;
    if (userName && userName !== currentUser.userName) {
      const existingUserName = await User.findOne({ userName });
      if (existingUserName && existingUserName._id.toString() !== currentUser._id.toString()) {
        return res.status(409).json({ message: "Username already taken" });
      }
      currentUser.userName = userName;
    }
    if (typeof bio === "string") currentUser.bio = bio;
    if (typeof avatar === "string") currentUser.avatar = avatar;

    await currentUser.save();

    return res.status(200).json({ user: userResponse(currentUser) });
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile" });
  }
};

export const updateUserAvatar = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = req.user;
    const { avatarUrl } = req.body;

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!avatarUrl || typeof avatarUrl !== "string") {
      return res.status(400).json({ message: "Avatar URL is required" });
    }

    currentUser.avatar = avatarUrl;
    await currentUser.save();

    return res.status(200).json({ user: userResponse(currentUser) });
  } catch (error) {
    return res.status(500).json({ message: "Error updating avatar" });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userResponse(user) });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile" });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("name userName email bio avatar followers following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: userResponse(user) });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
};

export const followUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = req.user;
    const { id } = req.params;

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (currentUser._id.toString() === id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = currentUser.following?.some(
      (item) => item.toString() === id
    );

    if (alreadyFollowing) {
      return res.status(400).json({ message: "Already following this user" });
    }

    currentUser.following = [...(currentUser.following || []), targetUser._id];
    targetUser.followers = [...(targetUser.followers || []), currentUser._id];

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error following user" });
  }
};

export const unfollowUser = async (req: AuthRequest, res: Response) => {
  try {
    const currentUser = req.user;
    const { id } = req.params;

    if (!currentUser) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const targetUser = await User.findById(id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following = (currentUser.following || []).filter(
      (item) => item.toString() !== id
    );
    targetUser.followers = (targetUser.followers || []).filter(
      (item) => item.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error unfollowing user" });
  }
};
