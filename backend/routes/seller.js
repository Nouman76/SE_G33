import express from "express";
import { loginSeller,getSellerAnalytics } from "../controllers/seller.js";

const router = express.Router();

router.post("/login", loginSeller);
// router.post("/signup", signupSeller); // 👈 NEW
router.get('/analytics', getSellerAnalytics);
export default router;
