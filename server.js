require('dotenv').config();

const express = require('express');
const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');
const uploadController = require('./controllers/uploadController');
const { authenticateToken } = require('./middlewares/authMiddleware');
const connectDB = require('./models/database');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Auth Route
app.post('/auth', authController.login);
app.post('/auth/verify', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

// Order CRUD Routes
app.post('/orders', orderController.createOrder);
app.get('/orders', authenticateToken, orderController.getOrders);
app.get('/orders/:id', orderController.getOrderById);
app.put('/orders/:id', authenticateToken, orderController.updateOrder);
app.delete('/orders/:id', authenticateToken, orderController.deleteOrder);

// Product CRUD Routes
app.post('/products', authenticateToken, productController.createProduct);
app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', authenticateToken, productController.updateProduct);
app.delete('/products/:id', authenticateToken, productController.deleteProduct);

// Upload Routes
app.post('/uploads', authenticateToken, uploadController.fileUpload);
app.get('/uploads', authenticateToken, uploadController.getAllFiles);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});