export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'gps-devices' | 'gps-trackers' | 'home-automation' | 'accessories';
  image: string;
  images: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviews: number;
  brand: string;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // In a real application, never store passwords, even hashed, on the client-side.
  // This is for demonstration purposes only.
  password?: string; 
  role: 'admin' | 'customer';
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  recentOrders: Order[];
}
