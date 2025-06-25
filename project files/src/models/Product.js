import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  seller: { type: String, required: true },
  sellerId: { type: String, required: true },
  tags: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model('Product', ProductSchema);