import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }, 
   storeName: { type: String, required: true, unique: true },  
   businessAddress: { type: String, required: true },  
   phoneNumber: { type: String, required: true }, 
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],  
   orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],  
   createdAt: { type: Date, default: Date.now }
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
