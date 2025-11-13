import React, { useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Activity, Settings, Shield, Bell, Download, Search, Filter, ChevronDown, MoreVertical, CheckCircle, XCircle, Clock, AlertCircle, LogOut } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const userName = localStorage.getItem('userEmail')?.split('@')[0] || 'Admin';

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  // Mock data
  const stats = [
    { 
      label: 'Total Users', 
      value: '2,847', 
      change: '+12.5%', 
      trend: 'up', 
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Active Bookings', 
      value: '1,432', 
      change: '+8.2%', 
      trend: 'up', 
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Revenue (Today)', 
      value: '₹45,230', 
      change: '+23.1%', 
      trend: 'up', 
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Facility Usage', 
      value: '87%', 
      change: '-2.3%', 
      trend: 'down', 
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentBookings = [
    { id: 1, user: 'Rahul Sharma', facility: 'Football Field - Main', date: '2025-11-11', time: '06:00 PM', amount: 500, status: 'confirmed' },
    { id: 2, user: 'Priya Menon', facility: 'Basketball Court 1', date: '2025-11-11', time: '07:00 PM', amount: 300, status: 'confirmed' },
    { id: 3, user: 'Arjun Reddy', facility: 'Badminton Hall - A', date: '2025-11-12', time: '08:00 AM', amount: 200, status: 'pending' },
    { id: 4, user: 'Sneha Patel', facility: 'Tennis Court', date: '2025-11-12', time: '05:00 PM', amount: 400, status: 'confirmed' },
    { id: 5, user: 'Vikram Singh', facility: 'Cricket Ground', date: '2025-11-13', time: '04:00 PM', amount: 600, status: 'cancelled' },
  ];

  const allUsers = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@nitk.edu.in', bookings: 24, spent: 12000, joined: '2025-01-15', status: 'active' },
    { id: 2, name: 'Priya Menon', email: 'priya@nitk.edu.in', bookings: 18, spent: 9500, joined: '2025-02-20', status: 'active' },
    { id: 3, name: 'Arjun Reddy', email: 'arjun@nitk.edu.in', bookings: 31, spent: 15600, joined: '2024-11-10', status: 'active' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@nitk.edu.in', bookings: 12, spent: 6200, joined: '2025-03-05', status: 'active' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@nitk.edu.in', bookings: 8, spent: 4100, joined: '2025-04-12', status: 'inactive' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle className="w-4 h-4" /> },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <Clock className="w-4 h-4" /> },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle className="w-4 h-4" /> },
      active: { bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle className="w-4 h-4" /> },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-700', icon: <XCircle className="w-4 h-4" /> },
    };
    const style = styles[status] || styles.pending;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        {style.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredBookings = recentBookings.filter(booking => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 hover:scale-105 transition">
                <span className="text-3xl">🏆</span>
                NITK Sports
              </a>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-bold">
                <Shield className="w-4 h-4" />
                Admin Panel
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-900 font-semibold">{userName}</span>
                <span className="px-2 py-1 text-xs rounded-full font-semibold bg-purple-600 text-white">Admin</span>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Control Panel
          </h1>
          <p className="text-gray-600 text-lg">Monitor and manage all platform activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-3 transition`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'users'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => {
                window.location.href = '/dashboard';
              }}
              className="px-6 py-4 font-semibold text-gray-600 hover:text-gray-900 transition whitespace-nowrap ml-auto"
            >
              Manage Facilities →
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
                  <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold transition">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Facility</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {booking.user.charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900">{booking.user}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{booking.facility}</td>
                          <td className="py-4 px-4 text-gray-700">
                            <div className="text-sm">{booking.date}</div>
                            <div className="text-xs text-gray-500">{booking.time}</div>
                          </td>
                          <td className="py-4 px-4 font-bold text-gray-900">₹{booking.amount}</td>
                          <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                          <td className="py-4 px-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* All Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Facility</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-4 px-4 text-gray-600">#{booking.id}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                {booking.user.charAt(0)}
                              </div>
                              <span className="font-medium text-gray-900">{booking.user}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{booking.facility}</td>
                          <td className="py-4 px-4 text-gray-700">
                            <div className="text-sm">{booking.date}</div>
                            <div className="text-xs text-gray-500">{booking.time}</div>
                          </td>
                          <td className="py-4 px-4 font-bold text-gray-900">₹{booking.amount}</td>
                          <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg font-semibold transition">
                                View
                              </button>
                              <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold transition">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg">
                      <Users className="w-4 h-4" />
                      Add User
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500">Joined: {user.joined}</span>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{user.bookings}</p>
                            <p className="text-xs text-gray-500">Bookings</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">₹{user.spent.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Total Spent</p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 rounded-lg font-semibold transition">
                              View
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Facilities</h3>
                    <div className="space-y-3">
                      {['Football Field', 'Basketball Court', 'Badminton Hall', 'Tennis Court', 'Cricket Ground'].map((facility, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{facility}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-white rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                style={{ width: `${100 - idx * 15}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-900 font-bold text-sm">{100 - idx * 15}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Peak Booking Hours</h3>
                    <div className="space-y-3">
                      {['06:00 PM - 08:00 PM', '05:00 PM - 06:00 PM', '08:00 AM - 10:00 AM', '04:00 PM - 05:00 PM', '10:00 AM - 12:00 PM'].map((time, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">{time}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-white rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${95 - idx * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-900 font-bold text-sm">{95 - idx * 10}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trend (Last 7 Days)</h3>
                  <div className="h-64 flex items-end justify-between gap-4">
                    {[42000, 38000, 45000, 50000, 47000, 52000, 45230].map((amount, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div className="relative w-full">
                          <div 
                            className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-purple-600"
                            style={{ height: `${(amount / 52000) * 200}px` }}
                          ></div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-900">₹{(amount / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-gray-500">Day {idx + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
