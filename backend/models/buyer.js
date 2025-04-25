import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }, 
   address: { type: String, required: true },
   phoneNumber: { type: String, required: true },
   role: { type: String, enum: ["buyer", "admin"], default: "buyer" },  
   myOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],  
   createdAt: { type: Date, default: Date.now },
   purchasedProducts: [{
      productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      purchasedAt: { type: Date, default: Date.now }
    }],
});

const User = mongoose.model("Buyer", userSchema);
export default User;
