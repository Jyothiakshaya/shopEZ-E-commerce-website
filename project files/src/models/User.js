import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'seller'],
    default: 'customer'
  },
  avatar: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);