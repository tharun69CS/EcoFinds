# EcoFinds - Sustainable Marketplace

EcoFinds is a full-stack web application that serves as a marketplace for eco-friendly and sustainable products. Users can buy, sell, and trade pre-loved items to reduce waste and promote environmental sustainability.

## Features

- **User Authentication**: Secure registration and login system
- **Product Listings**: Create, read, update, and delete product listings
- **Image Upload**: Upload images for product listings
- **Search & Filter**: Find products by keywords, categories, and sort by various criteria
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **User Profiles**: View and manage your product listings

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for component styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose for data storage
- JWT for authentication
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/ecofinds.git
   cd ecofinds
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with search, filter, sort)
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `GET /api/products/user` - Get current user's products

### Upload
- `POST /api/upload` - Upload a product image

## Future Enhancements

- User ratings and reviews
- Messaging system between buyers and sellers
- Payment integration
- Social media sharing
- Advanced filtering options
- Favorites/wishlist functionality

## License

This project is licensed under the MIT License.