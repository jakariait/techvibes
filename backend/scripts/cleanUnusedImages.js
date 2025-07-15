import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

// Models
import CarouselModel from "../models/CarouselModel.js";
import FeatureImageModel from "../models/FeatureImageModel.js";
import GeneralInfoModel from "../models/GeneralInfoModel.js";
import ProductModel from "../models/ProductModel.js";
import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";
import ProfileModel from "../models/ProfileModel.js";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set to collect used image filenames
const usedImages = new Set();
const addImage = (img) => {
  if (img && typeof img === "string") {
    usedImages.add(img);
  }
};

const collectUsedImages = async () => {
  // Carousels
  const carousels = await CarouselModel.find({}, "imgSrc");
  carousels.forEach(({ imgSrc }) => addImage(imgSrc));

  // Feature images
  const features = await FeatureImageModel.find({}, "imgSrc");
  features.forEach(({ imgSrc }) => addImage(imgSrc));

  // General info logos
  const infos = await GeneralInfoModel.find({}, "PrimaryLogo SecondaryLogo Favicon");
  infos.forEach(({ PrimaryLogo, SecondaryLogo, Favicon }) => {
    addImage(PrimaryLogo);
    addImage(SecondaryLogo);
    addImage(Favicon);
  });

  // Products
  const products = await ProductModel.find({}, "thumbnailImage images");
  products.forEach(({ thumbnailImage, images }) => {
    addImage(thumbnailImage);
    images?.forEach(addImage);
  });

  // Profiles
  const profiles = await ProfileModel.find({}, "profilePhoto galleryPhotos coverPhoto brandLogo");
  profiles.forEach(({ profilePhoto, galleryPhotos, coverPhoto, brandLogo }) => {
    addImage(profilePhoto);
    addImage(coverPhoto);
    addImage(brandLogo);
    galleryPhotos?.forEach(addImage);
  });

  // Users
  const users = await UserModel.find({}, "userImage");
  users.forEach(({ userImage }) => addImage(userImage));

  // Blogs
  const blogs = await BlogModel.find({}, "thumbnailImage");
  blogs.forEach(({ thumbnailImage }) => addImage(thumbnailImage));
};

await collectUsedImages();

const uploadsDir = path.join(__dirname, "../uploads");

fs.readdir(uploadsDir, (err, allFiles) => {
  if (err) {
    console.error("❌ Failed to read uploads directory:", err);
    process.exit(1);
  }

  const unusedFiles = allFiles.filter((file) => !usedImages.has(file));
  let deletedCount = 0;

  if (unusedFiles.length === 0) {
    console.log("✅ No unused images to delete. Uploads folder is clean.");
    process.exit(0);
  }

  unusedFiles.forEach((file) => {
    const fullPath = path.join(uploadsDir, file);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error(`❌ Failed to delete ${file}:`, err);
      } else {
        deletedCount++;
        if (deletedCount === unusedFiles.length) {
          console.log(`✅ Cleanup complete. ${deletedCount} unused image(s) deleted.`);
          process.exit(0);
        }
      }
    });
  });
});
