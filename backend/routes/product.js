import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addReview // Import the new addReview function
} from "../controllers/product.js";

const router = express.Router();

router.post("/", createProduct); // Create a product
router.get("/", getProducts); // Fetch all products
router.get("/:id", getProductById); // Fetch a single product by ID
router.put("/:id", updateProduct); // Update a product by ID
router.delete("/:id", deleteProduct); // Delete a product by ID
router.get("/category/:category", getProductsByCategory); // Get top 3 products by category
router.post("/:productId/review", addReview); // Add review to a product

export default router;