import Seller from "../models/seller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "../models/product.js";

export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: seller._id }, "yourSecretKey", { expiresIn: "1h" });

    res.json({ token, seller });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getSellerAnalytics = async (req, res) => {
  console.log('\n=== ANALYTICS REQUEST STARTED ===');
  
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "yourSecretKey");

    const seller = await Seller.findById(decoded.id).lean();
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const products = await Product.find({ seller: decoded.id })
      .populate({
        path: 'purchases',
        select: 'quantity purchasedAt price' 
      })
      .lean();

   
    const productsWithStats = products
      .map(product => {
        const salesCount = product.purchases?.reduce((sum, purchase) => sum + purchase.quantity, 0) || 0;
        const revenue = product.purchases?.reduce((sum, purchase) => {
          const price = purchase.price || product.price || 0;
          return sum + (purchase.quantity * price);
        }, 0) || 0;
        
        return {
          ...product,
          salesCount,
          revenue
        };
      })
      .filter(product => product.salesCount > 0); 

    const totalSales = productsWithStats.reduce((sum, p) => sum + p.salesCount, 0);
    const totalRevenue = productsWithStats.reduce((sum, p) => sum + p.revenue, 0);

    const analytics = {
      totalSoldProducts: productsWithStats.length,
      totalSales,
      totalRevenue,
      products: productsWithStats,
      topProducts: [...productsWithStats]
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, 5)
    };

    res.json({ success: true, analytics });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching analytics",
      error: error.message 
    });
  }
};