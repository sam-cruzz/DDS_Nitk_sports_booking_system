import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, LogOut, User, MapPin, Clock, Calendar, ChevronDown, Grid, List, BookOpen, ShoppingBag, AlertCircle, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Football Field - Main', amount: 1, unitPrice: 500, category: 'Football', location: 'Main Ground', icon: '⚽', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400' },
    { id: 2, name: 'Basketball Court 1', amount: 2, unitPrice: 300, category: 'Basketball', location: 'Indoor Stadium', icon: '🏀', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
    { id: 3, name: 'Badminton Hall - A Block', amount: 8, unitPrice: 200, category: 'Badminton', location: 'Sports Complex', icon: '🏸', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400' },
    { id: 4, name: 'Tennis Court', amount: 4, unitPrice: 400, category: 'Tennis', location: 'Outdoor', icon: '🎾', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400' },
    { id: 5, name: 'Cricket Ground', amount: 1, unitPrice: 600, category: 'Cricket', location: 'Main Field', icon: '🏏', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
    { id: 6, name: 'Table Tennis Hall', amount: 6, unitPrice: 100, category: 'Table Tennis', location: 'Recreation Center', icon: '🏓', image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400' },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    unitPrice: '',
    category: '',
    location: '',
    icon: '',
  });

  const userType = localStorage.getItem('userType') || 'user';
  const isAdmin = userType === 'admin';
  const userName = localStorage.getItem('userEmail')?.split('@')[0] || 'User';

  const categories = ['All', 'Football', 'Basketball', 'Cricket', 'Badminton', 'Tennis', 'Table Tennis', 'Volleyball'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, amount: parseInt(formData.amount), unitPrice: parseFloat(formData.unitPrice) } : p));
    } else {
      const newProduct = {
        id: products.length + 1,
        ...formData,
        amount: parseInt(formData.amount),
        unitPrice: parseFloat(formData.unitPrice),
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400'
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', amount: '', unitPrice: '', category: '', location: '', icon: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      amount: product.amount.toString(),
      unitPrice: product.unitPrice.toString(),
      category: product.category,
      location: product.location,
      icon: product.icon,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this facility?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', amount: '', unitPrice: '', category: '', location: '', icon: '' });
    setShowModal(true);
  };

  const navigateToBooking = (productId) => {
    window.location.href = `/booking?productId=${productId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 hover:scale-105 transition">
                <span className="text-3xl">🏆</span>
                NITK Sports
              </a>
              {!isAdmin && (
                <>
                  <a href="/my-bookings" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold transition">
                    <BookOpen className="w-5 h-5" />
                    My Bookings
                  </a>
                  <a href="/gear-rental" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 font-semibold transition">
                    <ShoppingBag className="w-5 h-5" />
                    Rent Gear
                  </a>
                </>
              )}
              {isAdmin && (
                <a href="/admin" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition shadow-lg">
                  <Activity className="w-5 h-5" />
                  Admin Panel
                </a>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <User className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-900 font-semibold">{userName}</span>
                <span className={`px-2 py-1 text-xs rounded-full font-semibold ${isAdmin ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'}`}>
                  {isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition flex items-center gap-2 font-semibold">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {isAdmin ? 'Admin Dashboard' : 'Book Your Sports Facility'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isAdmin ? 'Manage all sports facilities and bookings' : 'Find and book available sports facilities instantly'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition">
                <span className="text-3xl">🏟️</span>
              </div>
              <span className="text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-full">FACILITIES</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{products.length}</p>
            <p className="text-gray-500 text-sm">Total Available</p>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition">
                <span className="text-3xl">📅</span>
              </div>
              <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">BOOKINGS</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">142</p>
            <p className="text-gray-500 text-sm">This Week</p>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition">
                <span className="text-3xl">✅</span>
              </div>
              <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">AVAILABLE</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{products.reduce((sum, p) => sum + p.amount, 0)}</p>
            <p className="text-gray-500 text-sm">Open Slots Today</p>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-yellow-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition">
                <span className="text-3xl">⭐</span>
              </div>
              <span className="text-yellow-600 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full">RATING</span>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-1">4.8</p>
            <p className="text-gray-500 text-sm">Average Rating</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
              <input
                type="text"
                placeholder="Search facilities by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            
            <div className="flex gap-3">
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

              <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 transition ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 transition ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {isAdmin && (
                <button onClick={openCreateModal} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition flex items-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-0.5">
                  <Plus className="w-5 h-5" />
                  Add Facility
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-xl font-semibold mb-2">No facilities found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`group relative overflow-hidden bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 ${viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'p-0'} ${viewMode === 'grid' ? 'transform hover:-translate-y-2' : ''}`}>
                {viewMode === 'grid' ? (
                  <>
                    <div className="relative h-48 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-4xl drop-shadow-lg">{product.icon}</span>
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur text-indigo-600 text-xs font-bold rounded-full shadow-lg">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm font-medium">{product.location}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">{product.amount} Available</span>
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            ₹{product.unitPrice}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!isAdmin ? (
                          <button
                            onClick={() => navigateToBooking(product.id)}
                            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
                          >
                            Book Now
                          </button>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(product)} className="flex-1 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl border border-blue-200 transition flex items-center justify-center gap-2">
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 transition flex items-center justify-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">{product.name}</h3>
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹{product.unitPrice}</div>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 text-sm mb-3 mt-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <span className="font-medium">{product.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{product.amount} Available</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!isAdmin ? (
                          <button onClick={() => navigateToBooking(product.id)} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition shadow-lg shadow-indigo-500/30">
                            Book Now
                          </button>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-lg border border-blue-200 transition flex items-center gap-2">
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg border border-red-200 transition flex items-center gap-2">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingProduct ? 'Edit Facility' : 'Add New Facility'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Facility Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition">
                    <option value="">Select</option>
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Icon</label>
                  <input type="text" name="icon" value={formData.icon} onChange={handleChange} placeholder="⚽" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Available Slots</label>
                  <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Price (₹)</label>
                  <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} step="0.01" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-500/30">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl border border-gray-300 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;