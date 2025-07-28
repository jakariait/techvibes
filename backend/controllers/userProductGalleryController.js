const service = require("../services/userProductGalleryService");

exports.createProduct = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!req.files || !req.files.productImage || req.files.productImage.length === 0) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const productImage = req.files.productImage[0].filename;
    const { productLink } = req.body;

    const product = { productImage, productLink };
    const result = await service.addProduct(userId, product);

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const result = await service.getProducts(req.params.userId);
    res.json(result || { products: [] });
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = req.params.userId;
    const index = parseInt(req.params.index);
    const { productLink } = req.body;

    let updates = { productLink };

    if (req.files && req.files.productImage && req.files.productImage.length > 0) {
      updates.productImage = req.files.productImage[0].filename;
    }

    const result = await service.updateProduct(userId, index, updates);
    if (!result) return res.status(404).json({ error: "Product not found" });

    res.json(result);
  } catch (err) {
    console.error("Failed to update product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const result = await service.deleteProduct(req.params.userId, req.params.index);
    if (!result) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted", result });
  } catch {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
