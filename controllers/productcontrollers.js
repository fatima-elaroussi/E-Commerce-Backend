const Products = require("../models/product");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Products.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
 
  try {
    
    //console.log("from params",req);
    console.log("req.body from createProduct:",req.body);
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Error saving product" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const id = req.params.id;
  
  try {
    const updated = await Products.findByIdAndUpdate(id, req.body);

    if (updated) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Products.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

// Filter products by category
const filterProduct = async (req, res) => {
  try {
    const category = req.query;

    const products = await Products.find(category);
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(500).json({ message: " category not found" });
    }
  } catch (error) {
    console.error("Error filtering by category", error);
    res.status(500).json({ error: "Error filtering by category" });
  }
};

// Sort products by field in ascending or descending order
const sortProduct = async (req, res) => {
  try {
    const { field, order } = req.query;
    const sortOrder = order === "desc" ? -1 : 1;
    if (order === "desc") {
      sortOrder === -1;
    } else if (order === "asc") {
      sortOrder === 1;
    } else {
      res.json({
        error: "You should choose between ascending or descending order",
      });
    }
    const filteredProducts = await Products.find().sort({ [field]: sortOrder });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.error("Error sorting products:", error);
    res.status(500).json({ error: "Error sorting products" });
  }
};

// Search products by keyword
const searchProduct = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    console.log(keyword);
    const resultSearch = await Products.find({
      $or: [{ title: keyword }, { description: keyword }, { category: keyword }],
    });
    console.log("resultSearch",resultSearch);
    if (resultSearch) {
      res.status(200).json(resultSearch);
    } else {
      res.status(404).json({ error: "Products not found" });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
};

// Filter products by price range
const productByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    const productsByRange = await Products.find({
      price: { $gte: min, $lte: max },
    });
    if (productsByRange.length > 0) {
      res.status(200).json(productsByRange);
    } else {
      res.status(404).json({ error: "Products not found in this range" });
    }
  } catch (error) {
    console.error("Error filtering products by price range:", error);
    res.status(500).json({ error: "Error filtering products by price range" });
  }
};

module.exports = {
  filterProduct,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  sortProduct,
  searchProduct,
  productByPriceRange,
};
