const UserProductGallery = require("../models/UserProductGallery");

exports.addProduct = async (userId, product) => {
  let gallery = await UserProductGallery.findOne({ userId });

  if (gallery) {
    gallery.products.push(product);
  } else {
    gallery = new UserProductGallery({ userId, products: [product] });
  }

  return await gallery.save();
};

exports.getProducts = async (userId) => {
  return await UserProductGallery.findOne({ userId });
};

exports.updateProduct = async (userId, index, updates) => {
  const gallery = await UserProductGallery.findOne({ userId });
  if (!gallery || !gallery.products[index]) return null;

  gallery.products[index] = { ...gallery.products[index]._doc, ...updates };
  return await gallery.save();
};

exports.deleteProduct = async (userId, index) => {
  const gallery = await UserProductGallery.findOne({ userId });
  if (!gallery || !gallery.products[index]) return null;

  gallery.products.splice(index, 1);
  return await gallery.save();
};
