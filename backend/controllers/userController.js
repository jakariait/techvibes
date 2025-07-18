const asyncHandler = require("express-async-handler");
const userService = require("../services/UserService");
const UserModel = require("../models/UserModel");
const generateToken = require("../utility/generateToken");
const profileService = require("../services/profileService");

// 🔐 Login user email
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    }).select("+password");

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// 👤 Create user
const createUser = asyncHandler(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    // ✅ Create default profile when user is created
    await profileService.createProfileForUser(user);

    const token = generateToken(user._id); // ✅ use the helper

    res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({
        message: "Failed to create user",
        error: error.message,
      });
    }
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const userId = req.user._id; // From your auth middleware
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Current and new passwords are required" });
  }

  const result = await userService.changePassword(
    userId,
    currentPassword,
    newPassword,
  );
  res.json(result);
});

// 🔍 Get user by slug (publicly accessible)
const getUserBySlug = asyncHandler(async (req, res) => {
  try {
    const slug = req.params.slug;

    const data = await userService.getUserBySlug(slug);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User and profile fetched",
      ...data,
    });
  } catch (error) {
    console.error("Error in getUserBySlug:", error); // 👈 helpful log
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

const deleteUserBySlug = asyncHandler(async (req, res) => {
  try {
    const result = await userService.deleteUserBySlug(req.params.slug);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user and profile",
      error: error.message,
    });
  }
});

// ✏️ Update user by slug (User only, not profile)
const updateUserOnlyBySlug = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;
    const updatedUser = await userService.updateUserOnlyBySlug(slug, req.body);

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
});

const updateProfileBySlug = asyncHandler(async (req, res) => {
  try {
    const slug = req.params.slug;

    // Attach single file fields if uploaded
    if (req.files?.profilePhoto?.[0]) {
      req.body.profilePhoto = req.files.profilePhoto[0].filename;
    }
    if (req.files?.coverPhoto?.[0]) {
      req.body.coverPhoto = req.files.coverPhoto[0].filename;
    }
    if (req.files?.brandLogo?.[0]) {
      req.body.brandLogo = req.files.brandLogo[0].filename;
    }

    // Update profile
    const updatedProfile = await userService.updateProfileBySlug(
      slug,
      req.body,
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

module.exports = {
  loginUser,
  createUser,
  changePassword,
  getUserBySlug,
  deleteUserBySlug,
  updateUserOnlyBySlug,
  updateProfileBySlug,
};
