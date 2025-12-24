# NFS Restaurant API

A simple Node.js Express API with CRUD operations for managing orders. The project is structured with separate controllers for better organization.

## Installation

1. Clone or download the project.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Running the API

- For production: `npm start`
- For development (with auto-restart): `npm run dev` (requires nodemon)

## Project Structure

- `server.js` - Main application file with routes and middleware
- `controllers/` - Folder containing controller logic
  - `authController.js` - Handles authentication routes
  - `orderController.js` - Handles order CRUD operations
- `middlewares/` - Folder containing middleware functions
  - `authMiddleware.js` - JWT authentication middleware

## API Endpoints

### Auth

- **POST /auth** - Authenticate user and get JWT token (requires `user` and `password` in body)

### Orders

- **GET /orders** - Retrieve all orders (requires JWT token in Authorization header)
- **GET /orders/:id** - Retrieve a single order by ID
- **POST /orders** - Create a new order (requires `name` in body, optional `description`)
- **PUT /orders/:id** - Update an order by ID (requires `name` in body, optional `description`)
- **DELETE /orders/:id** - Delete an order by ID

### Example Requests

#### Authenticate
```bash
curl -X POST http://localhost:3000/auth -H "Content-Type: application/json" -d '{"user": "admin", "password": "password"}'
```

#### Create an order
```bash
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"name": "Pizza Order", "description": "Delicious cheese pizza"}'
```

#### Get all orders
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/orders
```

#### Update an order
```bash
curl -X PUT http://localhost:3000/orders/1 -H "Content-Type: application/json" -d '{"name": "Updated Pizza Order", "description": "Even better pizza"}'
```

#### Delete an order
```bash
curl -X DELETE http://localhost:3000/orders/1
```

## Notes

- This is a basic implementation using in-memory storage. Data will be lost when the server restarts.
- For production use, consider adding a database like MongoDB or PostgreSQL.
- Basic JWT authentication is implemented. Use the /auth endpoint to get a token, then include it in Authorization header as Bearer token for protected routes (not yet protected in this version).
- Add proper user management and password hashing for production.