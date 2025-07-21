import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order, ShippingAddress } from '../types';
import { mockAdmin } from '../data/mockData';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // User & Auth state
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;

  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders state
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  placeOrder: () => Promise<Order | null>;

  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  // Search and filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  setSortBy: (sort: 'name' | 'price' | 'rating' | 'newest') => void;

  // Checkout state
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { id: product.id, product, quantity }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ cart: [], shippingAddress: null, checkoutStep: 1 }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      getCartItemsCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // User & Auth state
      user: null,
      users: [mockAdmin], // Start with the admin user
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        const { users } = get();
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          set({ user: foundUser, isAuthenticated: true });
          return foundUser;
        }
        return null;
      },
      signup: async (name, email, password) => {
        const { users } = get();
        if (users.some(u => u.email === email)) {
          return { success: false, message: 'User with this email already exists.' };
        }
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          password, // Storing plain text password for demo purposes only
          role: 'customer',
          avatar: `https://i.pravatar.cc/100?u=${email}`
        };
        set({ users: [...users, newUser] });
        return { success: true, message: 'Signup successful! Please log in.' };
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, shippingAddress: null, checkoutStep: 1 });
      },


      // Products state
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) => {
        set({
          products: [...get().products, product]
        });
      },
      updateProduct: (id, updates) => {
        set({
          products: get().products.map(product =>
            product.id === id ? { ...product, ...updates, updatedAt: new Date() } : product
          )
        });
      },
      deleteProduct: (id) => {
        set({
          products: get().products.filter(product => product.id !== id)
        });
      },

      // Orders state
      orders: [],
      setOrders: (orders) => set({ orders }),
      placeOrder: async () => {
        const { cart, user, shippingAddress, getCartTotal } = get();
        if (!user || !shippingAddress || cart.length === 0) {
          return null;
        }

        const newOrder: Order = {
          id: `ORD-${Date.now()}`,
          userId: user.id,
          items: cart,
          total: getCartTotal() + (getCartTotal() > 7999 ? 0 : 500), // Add shipping cost
          status: 'processing',
          createdAt: new Date(),
          shippingAddress: shippingAddress,
        };

        set({
          orders: [...get().orders, newOrder]
        });
        
        get().clearCart();

        return newOrder;
      },

      // UI state
      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),
      
      // Search and filter state
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: '',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 1000],
      setPriceRange: (range) => set({ priceRange: range }),
      sortBy: 'name',
      setSortBy: (sort) => set({ sortBy: sort }),

      // Checkout State
      checkoutStep: 1,
      setCheckoutStep: (step) => set({ checkoutStep: step }),
      shippingAddress: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
    }),
    {
      name: 'innomakers-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        users: state.users,
        isAuthenticated: state.isAuthenticated,
        products: state.products,
        orders: state.orders,
      }),
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState as object) };
        if (merged.users) {
          const users = merged.users as User[];
          const adminInState = users.find(u => u.id === '1');
          if (!adminInState || adminInState.email !== mockAdmin.email || !adminInState.password) {
            const otherUsers = users.filter(u => u.id !== '1');
            merged.users = [...otherUsers, mockAdmin];
          }
        }
        return merged;
      },
    }
  )
);
