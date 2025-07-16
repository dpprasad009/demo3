import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    getCartItemsCount, 
    setIsCartOpen, 
    user,
    isAuthenticated,
    logout,
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const isAdmin = user?.role === 'admin';
  const cartItemsCount = getCartItemsCount();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'GPS Devices', href: '/products?category=gps-devices' },
    { name: 'GPS Trackers', href: '/products?category=gps-trackers' },
    { name: 'Home Automation', href: '/products?category=home-automation' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IM</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">InnoMakers</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href || location.search === item.href.substring(item.href.indexOf('?'))
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                      >
                        <div className="py-1">
                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <LayoutDashboard className="w-4 h-4 mr-2" />
                              Admin
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600">
                    Login
                  </Link>
                  <Link to="/signup" className="text-sm font-medium text-white bg-primary-600 px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4 border-t border-gray-200"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4">
                <div className="flex flex-col space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        location.pathname === item.href
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {/* Mobile Auth Links */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-4 py-2">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                          <LayoutDashboard className="w-5 h-5 mr-3" /> Admin Panel
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                        <LogOut className="w-5 h-5 mr-3" /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 px-4">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                        Login
                      </Link>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
