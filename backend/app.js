// Import necessary modules
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import userRoutes from './routes/userroutes.js';
// import auctionroutes from './routes/auctionroutes.js';

// Create Express app
export const app = express();

// Connect to MongoDB
const uri = "mongodb+srv://25100159:cyostz0VrFONapW8@cluster0.8pxma.mongodb.net/";
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/auth', userRoutes); // Mount the user routes
// app.use('/auctionroutes', auctionroutes); // Mount the auction routes
