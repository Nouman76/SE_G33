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

router.post('/signup', registerBuyer);

router.post('/login', loginBuyer);

router.get('/profile', getBuyerProfile);

router.put('/updateprofile', updateBuyerProfile);

router.post('/changepassword', changePassword);

router.post('/add-purchases', addPurchasedProducts);

export default router;