const ProfileModel = require("../models/ProfileModel");

const profileService = {
  createProfileForUser: async (user) => {
    return await ProfileModel.create({
      user: user._id,
    });
  },
};

module.exports = profileService;
