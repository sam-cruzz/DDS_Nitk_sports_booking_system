import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus, ArrowLeft, Clock, Star, Award, Shield, ChevronDown } from 'lucide-react';

const GearRental = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [rentalHours, setRentalHours] = useState(1);

  const gearItems = [
    // Football
    { id: 1, name: 'Football', category: 'Football', icon: '⚽', price: 50, available: 15, image: 'https://images.unsplash.com/photo-1614632537239-d3d48e150216?w=400' },
    { id: 2, name: 'Football Boots', category: 'Football', icon: '👟', price: 100, available: 20, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
    { id: 3, name: 'Shin Guards', category: 'Football', icon: '🦵', price: 30, available: 25, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
    { id: 4, name: 'Goalkeeper Gloves', category: 'Football', icon: '🧤', price: 80, available: 10, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400' },
    
    // Basketball
    { id: 5, name: 'Basketball', category: 'Basketball', icon: '🏀', price: 60, available: 12, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
    { id: 6, name: 'Basketball Shoes', category: 'Basketball', icon: '👟', price: 120, available: 15, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400' },
    { id: 7, name: 'Jersey Set', category: 'Basketball', icon: '👕', price: 70, available: 20, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400' },
    
    // Badminton
    { id: 8, name: 'Badminton Racket', category: 'Badminton', icon: '🏸', price: 80, available: 30, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    { id: 9, name: 'Shuttlecocks (Pack)', category: 'Badminton', icon: '🏸', price: 40, available: 50, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    { id: 10, name: 'Badminton Shoes', category: 'Badminton', icon: '👟', price: 90, available: 18, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    
    // Cricket
    { id: 11, name: 'Cricket Bat', category: 'Cricket', icon: '🏏', price: 150, available: 12, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    { id: 12, name: 'Cricket Ball', category: 'Cricket', icon: '⚾', price: 30, available: 25, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    { id: 13, name: 'Batting Gloves', category: 'Cricket', icon: '🧤', price: 60, available: 20, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    { id: 14, name: 'Batting Pads', category: 'Cricket', icon: '🦵', price: 80, available: 15, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    { id: 15, name: 'Cricket Helmet', category: 'Cricket', icon: '⛑️', price: 100, available: 10, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    
    // Tennis
    { id: 16, name: 'Tennis Racket', category: 'Tennis', icon: '🎾', price: 100, available: 20, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
    { id: 17, name: 'Tennis Balls (Pack)', category: 'Tennis', icon: '🎾', price: 50, available: 30, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
    { id: 18, name: 'Tennis Shoes', category: 'Tennis', icon: '👟', price: 110, available: 16, image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
    
    // Table Tennis
    { id: 19, name: 'Table Tennis Paddle', category: 'Table Tennis', icon: '🏓', price: 60, available: 25, image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400' },
    { id: 20, name: 'Table Tennis Balls', category: 'Table Tennis', icon: '🏓', price: 20, available: 40, image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400' },
    
    // Volleyball
    { id: 21, name: 'Volleyball', category: 'Volleyball', icon: '🏐', price: 55, available: 18, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400' },
    { id: 22, name: 'Volleyball Knee Pads', category: 'Volleyball', icon: '🦵', price: 40, available: 22, image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400' },
  ];

  const categories = ['All', 'Football', 'Basketball', 'Badminton', 'Cricket', 'Tennis', 'Table Tennis', 'Volleyball'];

  const filteredGear = gearItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find(c => c.id === itemId);
    if (existing && existing.quantity > 1) {
      setCart(cart.map(c => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== itemId));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity * rentalHours), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const total = calculateTotal();
    window.location.href = `/payment?bookingId=${Date.now()}&amount=${total}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition font-semibold">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              NITK Sports
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Sports Gear Rental
          </h1>
          <p className="text-gray-600 text-lg">
            Rent premium sports equipment by the hour - No upfront purchase needed!
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-indigo-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Flexible Hours</h3>
              <p className="text-gray-600 text-sm">Rent for 1-8 hours per booking</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-purple-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Professional-grade equipment</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-green-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Sanitized & Safe</h3>
              <p className="text-gray-600 text-sm">Cleaned after every use</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
              <input
                type="text"
                placeholder="Search gear by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition cursor-pointer font-semibold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {filteredGear.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="text-4xl drop-shadow-lg">{item.icon}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-indigo-600 text-xs font-bold rounded-full shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{item.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{item.price}</p>
                    <p className="text-xs text-gray-500">per hour</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${item.available > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {item.available} available
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.available === 0}
                  className={`w-full py-2.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                    item.available === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-md h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <label className="block text-indigo-900 font-bold mb-2 text-sm">Rental Duration</label>
                <select
                  value={rentalHours}
                  onChange={(e) => setRentalHours(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-indigo-300 rounded-lg text-gray-900 font-semibold focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(hours => (
                    <option key={hours} value={hours}>
                      {hours} {hours === 1 ? 'Hour' : 'Hours'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-semibold">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some gear to get started!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">{item.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-lg font-bold text-indigo-600 mt-1">
                              ₹{item.price * item.quantity * rentalHours}
                              <span className="text-xs text-gray-500 ml-1">
                                (₹{item.price} × {item.quantity} × {rentalHours}h)
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg flex items-center justify-center transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                            className="ml-auto text-red-500 hover:text-red-700 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={clearCart}
                    className="w-full mb-4 py-2 text-red-600 hover:text-red-700 font-semibold text-sm transition"
                  >
                    Clear Cart
                  </button>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Subtotal</span>
                      <span className="text-gray-900 font-bold">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Duration</span>
                      <span className="text-gray-900 font-bold">{rentalHours} {rentalHours === 1 ? 'Hour' : 'Hours'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GearRental;
