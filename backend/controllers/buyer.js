import Buyer from "../models/buyer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new buyer
export const registerBuyer = async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  
  const existingBuyer = await Buyer.findOne({ email });
  if (existingBuyer) {
    return res.status(400).json({ message: "Buyer already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newBuyer = new Buyer({
    name,
    email,
    password: hashedPassword,
    address,
    phoneNumber,
  });

  try {
    await newBuyer.save();
    res.status(201).json({ message: "Buyer created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating buyer", error: error.message });
  }
};

// Login for existing buyer
export const loginBuyer = async (req, res) => {
  const { email, password } = req.body;

  const buyer = await Buyer.findOne({ email });
  if (!buyer) {
    return res.status(404).json({ message: "Buyer not found" });
  }

  const passwordMatch = await bcrypt.compare(password, buyer.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token without secret key or environment variable
  const token = jwt.sign({ id: buyer._id, email: buyer.email }, "yourSecretKey", { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful", token });
};



export const getBuyerProfile = async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];  // Extract token
      if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
      }
  
      const decodedToken = jwt.verify(token, 'yourSecretKey');  // Verify token
      const buyer = await Buyer.findById(decodedToken.id);  // Fetch buyer by ID
  
      if (!buyer) {
        return res.status(404).json({ message: "Buyer not found" });
      }
  
      const buyerData = {
        name: buyer.name,
        email: buyer.email,
        address: buyer.address,
        phoneNumber: buyer.phoneNumber,
      };
  
      res.status(200).json(buyerData);
    } catch (error) {
      console.error("Error fetching buyer profile:", error);
      res.status(400).json({ message: "Error fetching buyer profile", error: error.message });
    }
  };
  

// Change buyer password
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    console.log("Change password request received.");

    const token = req.headers.authorization.split(' ')[1];
  
    try {
      const decodedToken = jwt.verify(token, 'yourSecretKey');
      const buyer = await Buyer.findById(decodedToken.id);
      
      if (!buyer) {
        return res.status(404).json({ message: "Buyer not found" });
      }
  
      const isMatch = await bcrypt.compare(oldPassword, buyer.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      buyer.password = hashedNewPassword;
      await buyer.save();
  
      res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error changing password", error: error.message });
    }
  };
  
