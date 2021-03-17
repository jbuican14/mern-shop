import express from 'express';
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getOrderHistory,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/order.controller.js';
import { admin, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getOrderHistory);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
