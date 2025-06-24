export const mockProducts = [
  {
    id: '1',
    name: 'Elegant Gold Chain Bracelet',
    description: 'A stunning 18k gold-plated chain bracelet perfect for any occasion. Features delicate links and a secure clasp.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'jewelry',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
      'https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg'
    ],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    tags: ['gold', 'bracelet', 'elegant', 'gift'],
    seller: 'Golden Jewelry Co.',
    discount: 31
  },
  {
    id: '2',
    name: 'Luxury Designer Handbag',
    description: 'Premium leather handbag with elegant design. Perfect for both casual and formal occasions.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'bags',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg'
    ],
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    tags: ['handbag', 'leather', 'luxury', 'designer'],
    seller: 'Fashion Elite',
    discount: 25
  },
  {
    id: '3',
    name: 'Diamond Stud Earrings',
    description: 'Classic diamond stud earrings set in sterling silver. Timeless elegance for everyday wear.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'jewelry',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
    images: [
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg'
    ],
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    tags: ['earrings', 'diamond', 'sterling silver', 'classic'],
    seller: 'Diamond Dreams',
    discount: 20
  },
  {
    id: '4',
    name: 'Silk Designer Scarf',
    description: 'Luxurious silk scarf with intricate patterns. Perfect complement to any outfit.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'accessories',
    image: 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg',
    images: [
      'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg'
    ],
    rating: 4.5,
    reviewCount: 67,
    inStock: true,
    tags: ['scarf', 'silk', 'designer', 'luxury'],
    seller: 'Silk Boutique',
    discount: 20
  },
  {
    id: '5',
    name: 'Rose Gold Watch',
    description: 'Elegant rose gold watch with leather strap. Perfect blend of style and functionality.',
    price: 349.99,
    originalPrice: 449.99,
    category: 'watches',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    tags: ['watch', 'rose gold', 'leather', 'elegant'],
    seller: 'TimeKeepers',
    discount: 22
  },
  {
    id: '6',
    name: 'Pearl Necklace Set',
    description: 'Cultured pearl necklace with matching earrings. Classic elegance for special occasions.',
    price: 159.99,
    originalPrice: 199.99,
    category: 'jewelry',
    image: 'https://images.pexels.com/photos/1453155/pexels-photo-1453155.jpeg',
    images: [
      'https://images.pexels.com/photos/1453155/pexels-photo-1453155.jpeg'
    ],
    rating: 4.6,
    reviewCount: 94,
    inStock: true,
    tags: ['pearls', 'necklace', 'earrings', 'classic'],
    seller: 'Pearl Paradise',
    discount: 20
  },
  {
    id: '7',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    originalPrice: 299.99,
    category: 'electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
    ],
    rating: 4.4,
    reviewCount: 312,
    inStock: true,
    tags: ['headphones', 'bluetooth', 'wireless', 'noise-cancelling'],
    seller: 'TechSound',
    discount: 33
  },
  {
    id: '8',
    name: 'Premium Coffee Maker',
    description: 'Professional-grade coffee maker with programmable settings and thermal carafe.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'home',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg'
    ],
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    tags: ['coffee maker', 'kitchen', 'programmable', 'thermal'],
    seller: 'Home Essentials',
    discount: 25
  }
];

export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@shopez.com',
    avatar: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg',
    isAdmin: true
  }
];

export const mockCategories = [
  { id: 'all', name: 'All Products', icon: 'Grid3x3' },
  { id: 'jewelry', name: 'Jewelry', icon: 'Gem' },
  { id: 'bags', name: 'Bags', icon: 'ShoppingBag' },
  { id: 'accessories', name: 'Accessories', icon: 'Shirt' },
  { id: 'watches', name: 'Watches', icon: 'Clock' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Kitchen', icon: 'Home' }
];