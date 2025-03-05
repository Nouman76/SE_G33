import Product from "../models/product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, seller, images } = req.body;

    if (!name || !description || !price || !stock || !category || !seller) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newProduct = new Product({ name, description, price, stock, category, seller, images });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product!", error: error.message });
  }
};

// View All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products!", error: error.message });
  }
};

// Get a Single Product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product!", error: error.message });
  }
};

// Update Product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product!", error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID from request URL
    const product = await Product.findByIdAndDelete(id); // Delete product by ID

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product!", error: error.message });
  }
};
