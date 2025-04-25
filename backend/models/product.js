import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   stock: { type: Number, required: true, default: 1 },
   category: { type: String, required: true },
   seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },  
   images: [{ type: String }],  // Image URLs
   createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);
export default Product;
