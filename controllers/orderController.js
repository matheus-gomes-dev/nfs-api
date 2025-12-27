const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { name, items, status } = req.body;
    if (!name || !items || !Array.isArray(items) || items.length === 0 || !status) {
      return res.status(400).json({ error: 'Name, status and non-empty items array are required' });
    }
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate('items');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    ).populate('items');
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(updatedOrder);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid order ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};