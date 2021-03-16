import asyncHandler from 'express-async-handler';
import Order from '../models/order.model.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // Destructor from request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check point for non existing item
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Save in db
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc Get order by ID
// @route POST /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // Destructor from request body
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Destructor from request body
  console.log('In update Order to paid controller');
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  console.log(order);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }

  // Save to a database
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// order history
// @desc GET logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getOrderHistory = asyncHandler(async (req, res) => {
  console.log('req.user._id', req.user._id, req);
  const orders = await Order.find({ user: req.user._id });
  console.log(orders);
  res.json(orders);
});

// @desc Get all orders
// GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrderHistory,
  getAllOrders,
};
