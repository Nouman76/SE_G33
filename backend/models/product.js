import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  category: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  purchases: [{
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
    quantity: { type: Number, required: true },
    purchasedAt: { type: Date, default: Date.now }
  }],
  reviews: [{
    buyer: { type:String },
    rating: { type: Number, required: true, min: 1, max: 5 }, 
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

const Product = mongoose.model("Product", productSchema);
export default Product;