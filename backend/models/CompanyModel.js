const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLogo: {
      type: String,
    },
    website: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      value: { type: String },
      label: { type: String , default: "Head Office" },
    },

    locations: {
      value: { type: String },
      label: { type: String , default: "Head Office" },
    },

    // 👇 Multiple admins (array of ObjectId references to User)
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model("Company", companySchema);
