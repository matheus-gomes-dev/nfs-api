require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
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
app.put('/orders/:id', authenticateToken, orderController.updateOrder);

// DELETE: Delete an order by ID
app.delete('/orders/:id', authenticateToken, orderController.deleteOrder);

// Product CRUD Routes

// CREATE: Add a new product
app.post('/products', authenticateToken, productController.createProduct);

// READ: Get all products
app.get('/products', productController.getProducts);

// READ: Get a single product by ID
app.get('/products/:id', productController.getProductById);

// UPDATE: Update a product by ID
app.put('/products/:id', authenticateToken, productController.updateProduct);

// DELETE: Delete a product by ID
app.delete('/products/:id', authenticateToken, productController.deleteProduct);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});