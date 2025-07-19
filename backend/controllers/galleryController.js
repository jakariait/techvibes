const galleryService = require("../services/galleryService");

async function getGallery(req, res) {
  try {
    const gallery = await galleryService.getGalleryByUserId(req.params.userId);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addImages(req, res) {
  try {
    const userId = req.params.userId;

    if (!req.files || !req.files.galleryImages || req.files.galleryImages.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Extract file names from req.files.galleryImages
    const imageFileNames = req.files.galleryImages.map(file => file.filename);

    const updatedGallery = await galleryService.createOrUpdateGallery(userId, imageFileNames);
    res.json({ message: "Gallery updated", gallery: updatedGallery });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteImage(req, res) {
  try {
    const { userId, imageName } = req.params;
    const updatedGallery = await galleryService.deleteImage(userId, imageName);
    res.json({ message: "Image deleted", gallery: updatedGallery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getGallery,
  addImages,
  deleteImage,
};
