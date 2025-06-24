// Product type structure
export const ProductSchema = {
  id: '',
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  category: '',
  image: '',
  images: [],
  rating: 0,
  reviewCount: 0,
  inStock: true,
  tags: [],
  seller: '',
  discount: 0
};

// CartItem type structure
export const CartItemSchema = {
  product: ProductSchema,
  quantity: 0
};

// User type structure
export const UserSchema = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  isAdmin: false
};

// Order type structure
export const OrderSchema = {
  id: '',
  userId: '',
  items: [],
  total: 0,
  status: 'pending', // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: new Date(),
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  },
  paymentMethod: ''
};

// Review type structure
export const ReviewSchema = {
  id: '',
  userId: '',
  userName: '',
  rating: 0,
  comment: '',
  createdAt: new Date()
};