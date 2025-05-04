import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
export const app = express();


const uri = "mongodb+srv://25100159:cyostz0VrFONapW8@cluster0.8pxma.mongodb.net/";
mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

