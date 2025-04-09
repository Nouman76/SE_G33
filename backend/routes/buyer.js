import express from 'express';
import { registerBuyer, loginBuyer, getBuyerProfile, changePassword } from '../controllers/buyer.js';

const router = express.Router();

// POST a new buyer (Sign Up)
router.post('/signup', registerBuyer);

// POST login for buyer
router.post('/login', loginBuyer);

// GET buyer profile (protected route)
router.get('/profile', getBuyerProfile);

// POST change password (protected route)
router.post('/changepassword', changePassword);

export default router;
