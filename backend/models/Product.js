import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: {
      values: ['Home Decor', 'Jewelry', 'Clothing', 'Accessories', 'Art', 'Kitchen', 'Personal Care', 'Other'],
      message: 'Please select a valid category'
    }
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least one image'],
    validate: {
      validator: function(arr) {
        return arr.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  ecoBadge: {
    type: String,
    required: [true, 'Please provide an eco badge'],
    enum: {
      values: ['Handmade', 'Organic', 'Recycled', 'Sustainable', 'Natural', 'Upcycled'],
      message: 'Please select a valid eco badge'
    }
  },
  sellerName: {
    type: String,
    required: [true, 'Please provide seller name'],
    trim: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
