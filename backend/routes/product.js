import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addReview 
} from "../controllers/product.js";

const router = express.Router();

router.post("/", createProduct); 
router.get("/", getProducts); 
router.get("/:id", getProductById); 
router.put("/:id", updateProduct); 
router.delete("/:id", deleteProduct); 
router.get("/category/:category", getProductsByCategory); 
router.post("/:productId/review", addReview); 


export default router;