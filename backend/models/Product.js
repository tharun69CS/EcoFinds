const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: 1000
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    enum: ['Furniture', 'Electronics', 'Clothing', 'Books', 'Home Decor', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: 0
  },
  imageUrl: {
    type: String,
    default: 'default-product.jpg'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
ProductSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', ProductSchema);