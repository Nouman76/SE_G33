import Product from "../models/product.js";

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

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category })
      .limit(3)
      .select("name price");

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category", error: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { buyerId, rating, comment } = req.body;
    if (!buyerId || !rating || !comment) {
      return res.status(400).json({ message: "Buyer ID, rating, and comment are required!" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    product.reviews.push({ buyer: buyerId, rating, comment });
    await product.save();

    res.status(201).json({ message: "Review added successfully!", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding review!", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search, sellerId } = req.query;
    let query = {};
        if (sellerId) {
      query.seller = sellerId;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products!", error: error.message });
  }
};


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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product!", error: error.message });
  }
};
export const reduceProductStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    
    product.stock -= quantity;
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};