const Gallery = require("../models/GalleryModel");

async function getGalleryByUserId(userId) {
  return await Gallery.findOne({ userId });
}

async function createOrUpdateGallery(userId, imageFileNames) {
  let gallery = await Gallery.findOne({ userId });

  if (!gallery) {
    // Ensure max 4 images on creation
    if (imageFileNames.length > 4) {
      throw new Error("Cannot upload more than 4 images.");
    }

    gallery = new Gallery({
      userId,
      galleryImages: imageFileNames,
    });
  } else {
    // Ensure max 4 images on update
    if (gallery.galleryImages.length + imageFileNames.length > 4) {
      throw new Error("Total images cannot exceed 4.");
    }

    gallery.galleryImages.push(...imageFileNames);
  }

  return await gallery.save();
}

async function deleteImage(userId, imageFileName) {
  const gallery = await Gallery.findOne({ userId });
  if (!gallery) throw new Error("Gallery not found.");

  gallery.galleryImages = gallery.galleryImages.filter(name => name !== imageFileName);
  return await gallery.save();
}

module.exports = {
  getGalleryByUserId,
  createOrUpdateGallery,
  deleteImage,
};
