const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const CompanyModel = require("../models/CompanyModel");

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
    const user = await UserModel.findOne({ slug })
      .populate("lastUpdatedBy", "fullName email")
      .select(
      "-password -resetOTP -resetOTPExpiry ",
    );
    if (!user) return null;

    const profile = await ProfileModel.findOne({ user: user._id }).populate("lastUpdatedBy", "fullName email");
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
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    Object.assign(user, userUpdates);
    await user.save();

    await user.populate("lastUpdatedBy", "fullName email");

    return {
      message: "User updated successfully",
      user,
    };
  },

  // 📝 Update profile by slug
  updateProfileBySlug: async (slug, profileData) => {
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    const profile = await ProfileModel.findOne({ user: user._id });
    if (!profile) throw new Error("Profile not found");

    Object.assign(profile, profileData);
    await profile.save();

    await profile.populate("lastUpdatedBy", "fullName email");

    return profile;
  },

  getProfileBySlug: async (slug) => {
    const user = await UserModel.findOne({ slug });
    if (!user) throw new Error("User not found");

    const profile = await ProfileModel.findOne({ user: user._id });
    if (!profile) throw new Error("Profile not found");

    await profile.populate("lastUpdatedBy", "fullName email");

    return profile;
  },

  getUsersByCompanyId: (companyId) => {
    return UserModel.find({ company: companyId }, "_id fullName email slug");
  },

  // New: Get all users with pagination and search
  getAllUsers: async ({ page = 1, limit = 10, search = "", filterType, startDate, endDate, month, year, company }) => {
    const searchRegex = new RegExp(search, "i");

    let query = {
      $or: [{ fullName: searchRegex }, { email: searchRegex }],
    };

    // Date-based filters
    if (filterType === "lastDay") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      query.createdAt = { $gte: yesterday };
    } else if (filterType === "lastWeek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      query.createdAt = { $gte: lastWeek };
    } else if (filterType === "lastMonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      query.createdAt = { $gte: lastMonth };
    } else if (filterType === "lastYear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      query.createdAt = { $gte: lastYear };
    } else if (filterType === "dateToDate" && startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (filterType === "month" && month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      query.createdAt = { $gte: start, $lte: end };
    } else if (filterType === "year" && year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      query.createdAt = { $gte: start, $lte: end };
    }

    // Company filter
    if (filterType === "company" && company) {
      const companyDoc = await CompanyModel.findOne({ companyName: company }).lean();
      if (companyDoc) {
        query.company = companyDoc._id;
      } else {
        query.company = null;
      }
    }

    const totalUsers = await UserModel.countDocuments(query);
    const allTimeUsers = await UserModel.countDocuments();

    const pages = Math.ceil(totalUsers / limit);
    const users = await UserModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("lastUpdatedBy", "fullName email")
      .select("-password -resetOTP -resetOTPExpiry -qrCode")
      .lean();

    return {
      users,
      totalUsers,
      allTimeUsers,
      pages,
    };
  },

  getAllUsersForExport: async ({ search = "", filterType, startDate, endDate, month, year, company }) => {
    const searchRegex = new RegExp(search, "i");

    let query = {
      $or: [{ fullName: searchRegex }, { email: searchRegex }],
    };

    // Date-based filters
    if (filterType === "lastDay") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      query.createdAt = { $gte: yesterday };
    } else if (filterType === "lastWeek") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      query.createdAt = { $gte: lastWeek };
    } else if (filterType === "lastMonth") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      query.createdAt = { $gte: lastMonth };
    } else if (filterType === "lastYear") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      query.createdAt = { $gte: lastYear };
    } else if (filterType === "dateToDate" && startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (filterType === "month" && month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59);
      query.createdAt = { $gte: start, $lte: end };
    } else if (filterType === "year" && year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year, 11, 31, 23, 59, 59);
      query.createdAt = { $gte: start, $lte: end };
    }

    // Company filter
    if (filterType === "company" && company) {
      const companyDoc = await CompanyModel.findOne({ companyName: company }).lean();
      if (companyDoc) {
        query.company = companyDoc._id;
      } else {
        query.company = null;
      }
    }

    const users = await UserModel.find(query)
      .sort({ createdAt: -1 })
      .populate("lastUpdatedBy", "fullName email")
      .select("fullName email phone role createdAt lastUpdatedBy")
      .lean();

    return users.map(user => {
      if (user.lastUpdatedBy) {
        user.lastUpdatedBy = `${user.lastUpdatedBy.fullName} (${user.lastUpdatedBy.email})`;
      }
      return user;
    });
  },


};

module.exports = userService;
