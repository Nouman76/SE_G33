import Buyer from "../models/buyer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Add this to your buyer controller
export const addPurchasedProducts = async (req, res) => {
  console.log("\n--- ADD PURCHASES START ---");
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token exists:", !!token);

    if (!token) {
      console.log("Unauthorized - no token");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, "yourSecretKey");
    console.log("Decoded token ID:", decoded.id);

    const buyer = await Buyer.findById(decoded.id);
    console.log("Buyer found:", !!buyer);
    console.log("Current purchasedProducts:", buyer?.purchasedProducts?.length || 0);

    if (!buyer) {
      console.log("Buyer not found");
      return res.status(404).json({ message: "Buyer not found" });
    }

    console.log("Adding products:", req.body.products);
    buyer.purchasedProducts.push(...req.body.products);
    
    const savedBuyer = await buyer.save();
    console.log("After save - purchasedProducts count:", savedBuyer.purchasedProducts.length);

    res.json({ 
      success: true,
      purchasedProducts: savedBuyer.purchasedProducts 
    });
    console.log("--- ADD PURCHASES SUCCESS ---\n");
  } catch (error) {
    console.error("ADD PURCHASES ERROR:", error);
    res.status(500).json({ 
      success: false,
      message: "Error adding purchases",
      error: error.message 
    });
  }  
};

export const updateBuyerProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "yourSecretKey");
    const buyer = await Buyer.findById(decoded.id);
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });

    const { name, email, phoneNumber, address } = req.body;

    buyer.name = name;
    buyer.email = email;
    buyer.phoneNumber = phoneNumber;
    buyer.address = address;

    await buyer.save();

    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ success: false, message: "Profile update failed", error: err.message });
  }
};

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
  console.log("\n--- GET PROFILE START ---");
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token exists:", !!token);

    if (!token) {
      console.log("Unauthorized - no token");
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decodedToken = jwt.verify(token, 'yourSecretKey');
    console.log("Decoded token ID:", decodedToken.id);

    const buyer = await Buyer.findById(decodedToken.id)
      .select('name email address phoneNumber purchasedProducts')
      .lean();
    
    console.log("Buyer found:", !!buyer);
    console.log("Purchased products count:", buyer?.purchasedProducts?.length || 0);

    if (!buyer) {
      console.log("Buyer not found");
      return res.status(404).json({ message: "Buyer not found" });
    }

    const responseData = {
      name: buyer.name,
      email: buyer.email,
      address: buyer.address,
      phoneNumber: buyer.phoneNumber,
      orders: buyer.purchasedProducts || []
    };

    console.log("Returning profile data");
    console.log("--- GET PROFILE SUCCESS ---\n");
    res.status(200).json(responseData);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
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
      console.log("Decoded token:", decodedToken);
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
  
