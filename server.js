require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const { authenticateToken } = require('./middlewares/authMiddleware');
const connectDB = require('./models/database');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Auth Route
app.post('/auth', authController.login);

// CRUD Routes

// CREATE: Add a new order
app.post('/orders', orderController.createOrder);

// READ: Get all orders
app.get('/orders', authenticateToken, orderController.getOrders);

// READ: Get a single order by ID
app.get('/orders/:id', orderController.getOrderById);

// UPDATE: Update an order by ID
app.put('/orders/:id', orderController.updateOrder);

// DELETE: Delete an order by ID
app.delete('/orders/:id', orderController.deleteOrder);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});