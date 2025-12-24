# NFS Restaurant API

A Node.js Express API with CRUD operations for managing orders and products. Uses MongoDB with Mongoose for data persistence and JWT for authentication.

## Installation

1. Clone or download the project.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the `MONGODB_URI` with your MongoDB connection string
   - Set up MongoDB locally or use MongoDB Atlas

## Running the API

- For production: `npm start`
- For development (with auto-restart): `npm run dev` (requires nodemon)

## Project Structure

- `server.js` - Main application file with routes and middleware
- `controllers/` - Folder containing controller logic
  - `authController.js` - Handles authentication routes
  - `orderController.js` - Handles order CRUD operations
  - `productController.js` - Handles product CRUD operations
- `middlewares/` - Folder containing middleware functions
  - `authMiddleware.js` - JWT authentication middleware
- `models/` - Folder containing database models and connection
  - `database.js` - MongoDB connection setup
  - `Order.js` - Order model schema
  - `Product.js` - Product model schema

## API Endpoints

### Auth

- **POST /auth** - Authenticate user and get JWT token (requires `user` and `password` in body)

### Orders

- **GET /orders** - Retrieve all orders (requires JWT token in Authorization header)
- **GET /orders/:id** - Retrieve a single order by ID
- **POST /orders** - Create a new order (requires `name`, `items` array, and `status` in body)
- **PUT /orders/:id** - Update an order by ID (requires `name`, `items` array, and `status` in body)
- **DELETE /orders/:id** - Delete an order by ID

### Products

- **GET /products** - Retrieve all products
- **GET /products/:id** - Retrieve a single product by ID
- **POST /products** - Create a new product (requires `name`, `price`, `category` in body, optional `description`, `available`)
- **PUT /products/:id** - Update a product by ID (requires `name`, `price`, `category` in body, optional `description`, `available`)
- **DELETE /products/:id** - Delete a product by ID

### Example Requests

#### Authenticate
```bash
curl -X POST http://localhost:3000/auth -H "Content-Type: application/json" -d '{"user": "admin", "password": "password"}'
```

#### Create an order
```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"name": "Pizza Order", "items": ["507f1f77bcf86cd799439011", "507f191e810c19729de860ea"], "status": "waiting"}'
```

#### Get all orders
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/orders
```

#### Update an order
```bash
curl -X PUT http://localhost:3000/orders/1 -H "Content-Type: application/json" -d '{"name": "Updated Pizza Order", "items": ["507f1f77bcf86cd799439011"], "status": "completed"}'
```

#### Delete an order
```bash
curl -X DELETE http://localhost:3000/orders/1
```

#### Create a product
```bash
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Margherita Pizza", "description": "Classic pizza with tomato sauce and mozzarella", "price": 12.99, "category": "Pizza", "available": true}'
```

#### Get all products
```bash
curl http://localhost:3000/products
```

#### Update a product
```bash
curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"name": "Updated Pizza", "description": "Updated description", "price": 14.99, "category": "Pizza", "available": true}'
```

#### Delete a product
```bash
curl -X DELETE http://localhost:3000/products/1
```

## Notes

- Uses MongoDB with Mongoose for data persistence
- Orders contain references to Products via the `items` array
- Order status can be: `waiting` (default), `completed`, or `canceled`
- Data is now persistent across server restarts
- For production use, set up proper MongoDB authentication and use environment variables for sensitive data
- Basic JWT authentication is implemented. Use the /auth endpoint to get a token, then include it in Authorization header as Bearer token for protected routes
- Add proper user management and password hashing for production