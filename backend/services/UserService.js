const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");

const userService = {
  createUser: async (userData) => await UserModel.create(userData),

  changePassword: async (userId, currentPassword, newPassword) => {
    const user = await UserModel.findById(userId).select("+password");
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new Error("Current password is incorrect");

    user.password = newPassword;
    await user.save();

    return { message: "Password updated successfully" };
  },

  getUserBySlug: async (slug) => {
    const user = await UserModel.findOne({ slug }).select(
      "-password -resetOTP -resetOTPExpiry ",
    );
    if (!user) return null;

    const profile = await ProfileModel.findOne({ user: user._id });
    return { user, profile };
  },

  // ❌ Delete both user and profile by slug
  deleteUserBySlug: async (slug) => {
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    await ProfileModel.deleteOne({ user: user._id });
    await UserModel.deleteOne({ _id: user._id });

    return { message: "User and profile deleted successfully" };
  },

  updateUserOnlyBySlug: async (slug, userUpdates = {}) => {
    const user = await UserModel.findOneAndUpdate({ slug }, userUpdates, {
      new: true,
      runValidators: true,
    });

    if (!user) throw new Error("User not found");

    return {
      message: "User updated successfully",
      user,
    };
  },

  // 📝 Update profile by slug
  updateProfileBySlug: async (slug, profileData) => {
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    const profile = await ProfileModel.findOneAndUpdate(
      { user: user._id },
      profileData,
      { new: true, runValidators: true },
    );

    if (!profile) throw new Error("Profile not found");

    return profile;
  },

  getProfileBySlug: async (slug) => {
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    const profile = await ProfileModel.findOne({ user: user._id });
    if (!profile) throw new Error("Profile not found");

    return profile;
  },

  getUsersByCompanyId: (companyId) => {
    return UserModel.find({ company: companyId }, "_id fullName email slug");
  },

  // New: Get all users with pagination and search
  getAllUsers: async ({ page = 1, limit = 10, search = "" }) => {
    const searchRegex = new RegExp(search, "i");

    const query = {
      $or: [{ fullName: searchRegex }, { email: searchRegex }],
    };

    const totalUsers = await UserModel.countDocuments(query); // filtered
    const allTimeUsers = await UserModel.countDocuments();    // all time

    const pages = Math.ceil(totalUsers / limit);
    const users = await UserModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password -resetOTP -resetOTPExpiry -qrCode")
      .lean();

    return {
      users,
      totalUsers,
      allTimeUsers,
      pages,
    };
  },


};

module.exports = userService;
