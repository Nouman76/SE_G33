import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
   products: [
      {
         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
         quantity: { type: Number, required: true },
      },
   ],
   totalAmount: { type: Number, required: true },
   status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
   createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
