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
    whatsapp: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    locations: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],

    // Other sections

    bio: String,
    bloodGroup: String,
    productAndServices: [
      {
        label: { type: String, required: true },
        value: { type: String }, // Optional URL or reference link
      },
    ],

    // Company Only
    sisterConcerns: [
      {
        label: { type: String, required: true },
        value: { type: String }, // Optional URL or reference link
      },
    ],


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
      start: { type: String, default: "09:00 AM" },
      end: { type: String, default: "06:00 PM" },
    },
    businessDay: {
      start: { type: String, default: "Saturday" },
      end: { type: String, default: "Thursday" },
    },
    businessTimeZone: {
      type: String,
      default: "BST",
    },

    brandLogo: String,
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Profile", profileSchema);
