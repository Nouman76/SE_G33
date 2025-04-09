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
import BuyerRoutes from './routes/buyer.js';

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

// Create Default Admins
const createAdmins = async () => {
  try {
    // First Admin
    const existingAdmin1 = await Seller.findOne({ email: "admin@example.com" });
    if (!existingAdmin1) {
      const hashedPassword1 = await bcrypt.hash("admin123", 10);
      const admin1 = new Seller({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword1,
        storeName: "AdminStore",
        businessAddress: "Admin HQ",
        phoneNumber: "1234567890",
      });
      await admin1.save();
      console.log("Default admin created!");
    } else {
      console.log("Admin already exists.");
    }

    // Second Admin
    const existingAdmin2 = await Seller.findOne({ email: "admin2@example.com" });
    if (!existingAdmin2) {
      const hashedPassword2 = await bcrypt.hash("admin456", 10);
      const admin2 = new Seller({
        name: "AdminTwo",
        email: "admin2@example.com",
        password: hashedPassword2,
        storeName: "SecondAdminStore",
        businessAddress: "Admin Branch",
        phoneNumber: "0987654321",
      });
      await admin2.save();
      console.log("Second admin created!");
    } else {
      console.log("Second admin already exists.");
    }

  } catch (error) {
    console.error("Error creating admins:", error.message);
  }
};

// Ensure admins are created after MongoDB connects
mongoose.connection.once("open", async () => {
  await createAdmins();
});

// API Routes
app.use("/seller", sellerRoutes);
app.use("/products", productRoutes); // Add this line

app.use('/buyer', BuyerRoutes);

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
