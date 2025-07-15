const mongoose = require("mongoose");
const ProfileView = require("../models/ProfileView");
const User = require("../models/UserModel");

const trackProfileView = async (profileId) => {
  const view = await ProfileView.create({ profileId });
  await User.findByIdAndUpdate(profileId, { $inc: { profileViews: 1 } });
  return view;
};

const getViewCount = (profileId) => {
  return ProfileView.countDocuments({ profileId });
};

const getDailyViews = (profileId) => {
  return ProfileView.aggregate([
    { $match: { profileId: new mongoose.Types.ObjectId(profileId) } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$viewedAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
  ]);
};

module.exports = {
  trackProfileView,
  getViewCount,
  getDailyViews,
};
