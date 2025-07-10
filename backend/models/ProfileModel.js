const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Info
    profilePhoto: String,
    coverPhoto: String,
    profilePhotoShape: {
      type: String,
      enum: ["square", "circle"],
      default: "square",
    },
    suffix: String,
    prefix: String,
    designation: String,
    companyName: String,

    // Corporate-only
    department: String,
    skills: [String],
    idNumber: String,

    // Contact
    contact: {
      emails: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      phones: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      whatsapp: { type: String },
      locations: [
        {
          value: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
    },

    // Other sections

    bio: String,
    bloodGroup: String,
    productAndServices: [String],
    portfolio: String,
    cvUrl: String,
    qrCodeUrl: String,

    // Theme
    themeAccessLevel: {
      type: String,
      enum: ["dark", "light"],
      default: "dark",
    },

    // Corporate Extras
    businessHours: {
      start: String,
      end: String,
    },
    brandLogo: String,

  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Profile", profileSchema);
