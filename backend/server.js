import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Seller from "./models/seller.js";
import sellerRoutes from "./routes/seller.js";
import productRoutes from "./routes/product.js"; // Import the product routes

// API Routes


dotenv.config();

// Initialize Express
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const uri = process.env.MONGO_URI || "mongodb+srv://25100159:cyostz0VrFONapW8@cluster0.8pxma.mongodb.net/";
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Create Default Admin
const createAdmin = async () => {
  try {
    const existingAdmin = await Seller.findOne({ email: "admin@example.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new Seller({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        storeName: "AdminStore",
        businessAddress: "Admin HQ",
        phoneNumber: "1234567890",
      });
      await admin.save();
      console.log("Default admin created!");
    } else {
      console.log("Admin already exists.");
    }
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
};

// Ensure admin is created after MongoDB connects
mongoose.connection.once("open", async () => {
  await createAdmin();
});

// API Routes
app.use("/seller", sellerRoutes);
app.use("/products", productRoutes); // Add this line
app.use("/seller", sellerRoutes);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
});

// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
