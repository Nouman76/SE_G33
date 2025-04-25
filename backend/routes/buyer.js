import express from 'express';
import { 
  registerBuyer, 
  loginBuyer, 
  getBuyerProfile, 
  changePassword,
  updateBuyerProfile,
  addPurchasedProducts 
} from '../controllers/buyer.js';

const router = express.Router();

// POST a new buyer (Sign Up)
router.post('/signup', registerBuyer);

// POST login for buyer
router.post('/login', loginBuyer);

// GET buyer profile (protected route)
router.get('/profile', getBuyerProfile);

// PUT update buyer profile
router.put('/updateprofile', updateBuyerProfile);

// POST change password (protected route)
router.post('/changepassword', changePassword);

// POST add purchased products (protected route)
router.post('/add-purchases', addPurchasedProducts);

export default router;