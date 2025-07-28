const mongoose = require("mongoose");

const userProductGallerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productImage: {
          type: String,
          required: true,
        },
        productLink: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserProductGallery", userProductGallerySchema);
