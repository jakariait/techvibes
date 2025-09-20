const asyncHandler = require("express-async-handler");
const userService = require("../services/UserService");
const UserModel = require("../models/UserModel");
const generateToken = require("../utility/generateToken");
const profileService = require("../services/profileService");
const json2csv = require('json2csv').parse;

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
    req.body.lastUpdatedBy = req.user._id;
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

    req.body.lastUpdatedBy = req.user._id;

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

// 👤 Get logged-in user
const getLoggedInUser = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User profile retrieved",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user profile", error: error.message });
  }
});

const getUsersByCompany = async (req, res) => {
  try {
    const users = await userService.getUsersByCompanyId(req.params.companyId);
    res.json({
      message: `${users.length} user${users.length !== 1 ? "s" : ""} found for this company`,
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const { page, limit, search, filterType, startDate, endDate, month, year, company } = req.query;

    const { users, totalUsers, allTimeUsers, pages } =
      await userService.getAllUsers({ page, limit, search, filterType, startDate, endDate, month, year, company });

    res.status(200).json({
      message: `${totalUsers} user${totalUsers.length !== 1 ? "s" : ""} found`,
      total: totalUsers,
      allTimeTotal: allTimeUsers,
      page: parseInt(page) || 1,
      pages,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

const exportUsersCSV = asyncHandler(async (req, res) => {
  try {
    const { search, filterType, startDate, endDate, month, year, company } = req.query;

    const users = await userService.getAllUsersForExport({ search, filterType, startDate, endDate, month, year, company });

    const fields = ['fullName', 'email', 'phone', 'role', 'createdAt', { label: 'Last Updated By', value: 'lastUpdatedBy' }];
    const opts = { fields };
    const csv = json2csv(users, opts);

    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);

  } catch (error) {
    res.status(500).json({
      message: "Failed to export users",
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
  getLoggedInUser,
  getUsersByCompany,
  getAllUsers,
  exportUsersCSV,
};
