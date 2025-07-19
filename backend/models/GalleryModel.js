const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  galleryImages: [
    {
      type: String,
      required: true,
    }
  ]
}, {
  timestamps: true,
});

module.exports = mongoose.model("Gallery", gallerySchema);
