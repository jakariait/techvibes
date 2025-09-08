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
      enum: ["square", "circle", "without-cover-photo"],
      default: "without-cover-photo",
    },

    suffix: String,

    prefix: String,

    designation: String,

    // Corporate-only
    editDesignationCompany: {
      type: Boolean,
      default: false,
    },

    companyName: String,

    // For Normal User On Permission Only
    brandLogo: String,

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

    qrCodeIsActive: {
      type: Boolean,
      default: true,
    },

    designationInfo: [
      {
        designation: {
          type: String,
          required: true,
          trim: true,
        },
        department: {
          type: String,
          trim: true,
        },
        organization: {
          type: String,
          required: true,
          trim: true,
        },
        // new fields for start date
        startMonth: {
          type: String,
          required: true,
          trim: true,
        },
        startYear: {
          type: Number,
          required: true,
        },
        // new fields for end date (optional)
        endMonth: {
          type: String,
          trim: true,
        },
        endYear: {
          type: Number,
        },
      },
    ],

    // Social Media Link
    socialMedia: [
      {
        platform: {
          type: String,
          required: true,
          enum: [
            "facebook",
            "facebook page",
            "twitter",
            "instagram",
            "linkedin",
            "youtube",
            "tiktok",
            "pinterest",
            "snapchat",
            "reddit",
            "github",
            "medium",
            "telegram",
            "discord",
            "website",
            "teams",
            "quora",
            "twitch",
            "soundcloud",
            "vimeo",
            "spotify",
            "behance",
            "fiverr",
            "dribbble",
            "upwork",
            "wechat",
            "apple music",
            "podcast",
            "freelancer",
            "threads",
            "tinder",
            "x.com",
          ],
        },
        url: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
      },
    ],

    // Custom Social Media Link
    customSocialMedia: [
      {
        platform: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        order: { type: Number, default: 0 },
      },
    ],

    youtubeUrl: { type: String },

    sectionOrder: {
      type: [String],
      default: [
        "designations",
        "skills",
        "productAndServices",
        "emails",
        "phones",
        "whatsapp",
        "locations",
        "sisterConcerns",
        "businessHours",
        "qrcode",
        "portfolio",
        "youtube",
      ],
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model("Profile", profileSchema);
