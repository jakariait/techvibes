const profileViewService = require("../services/ProfileViewService");

const handleProfileView = async (req, res) => {
  try {
    const profileId = req.params.id;
    await profileViewService.trackProfileView(profileId);
    res.status(200).json({ message: "Profile view tracked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfileViewCount = async (req, res) => {
  try {
    const profileId = req.params.id;
    const count = await profileViewService.getViewCount(profileId);
    res.json({ profileId, totalViews: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch view count" });
  }
};

const getProfileDailyViews = async (req, res) => {
  try {
    const profileId = req.params.id;
    const dailyViews = await profileViewService.getDailyViews(profileId);
    res.json({ profileId, dailyViews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch daily views" });
  }
};

module.exports = {
  handleProfileView,
  getProfileViewCount,
  getProfileDailyViews,
};
