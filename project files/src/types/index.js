// Product type definition
export const createProduct = (data) => ({
  id: data.id,
  name: data.name,
  description: data.description,
  price: data.price,
  originalPrice: data.originalPrice,
  image: data.image,
  category: data.category,
  rating: data.rating,
  reviews: data.reviews,
  inStock: data.inStock,
  seller: data.seller,
  tags: data.tags || []
});

// Cart item type definition
export const createCartItem = (product, quantity = 1) => ({
  product,
  quantity
});

// User type definition
export const createUser = (data) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  avatar: data.avatar,
  role: data.role || 'customer'
});

// Customer info type definition
export const createCustomerInfo = (data) => ({
  name: data.name,
  email: data.email,
  phone: data.phone
});

// Order type definition
export const createOrder = (data) => ({
  id: data.id,
  userId: data.userId,
  orderNumber: data.orderNumber,
  items: data.items,
  total: data.total,
  status: data.status,
  shippingAddress: data.shippingAddress,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  paymentMethod: data.paymentMethod,
  paymentStatus: data.paymentStatus,
  customerInfo: data.customerInfo
});

// Address type definition
export const createAddress = (data) => ({
  name: data.name,
  street: data.street,
  city: data.city,
  state: data.state,
  zipCode: data.zipCode,
  country: data.country
});

// Review type definition
export const createReview = (data) => ({
  id: data.id,
  userId: data.userId,
  userName: data.userName,
  rating: data.rating,
  comment: data.comment,
  createdAt: data.createdAt
});